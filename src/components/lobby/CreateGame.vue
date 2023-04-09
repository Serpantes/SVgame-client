<template>
  <div class="wrapper">
    <div class="upload" v-if="!siqFile">
      Игры нету. Пак есть? создавай
      <br />
      <b-form-file
        id="siq-input"
        class="mt-3"
        accept=".siq"
        drop-placeholder="Drop here"
        placeholder="Выберите файл"
        v-model="siqFile"
        @input="loadFile"
        plain
      />
    </div>
    <div v-if="siqFile" class="packInfo">
      <div>Название пака: {{ pack.name }}</div>
      <div>Дата создания: {{ pack.date }}</div>
      <div>Сложность: {{ pack.difficulty }}</div>
      <div>Раундов: {{ pack.rounds.length - 1 }} + Финал</div>
      <div>
        Медиа:
        <div>Картинок: {{ imagesFiles.length }}</div>
        <div>Аудио: {{ audioFiles.length }}</div>
        <div>Видео: {{ videoFiles.length }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import * as zip from "@zip.js/zip.js";
import * as xmlJs from "xml-js";

export default {
  name: "create-game",
  data() {
    return {
      siqFile: null,
      imagesFiles: [],
      audioFiles: [],
      videoFiles: [],
      contentFile: null,
      pack: {
        name: "",
        date: "",
        difficulty: "",
        rounds: [],
      },
    };
  },
  computed: {},
  methods: {
    async loadFile() {
      this.$log.debug("File selected");
      let data = await this.getFileContent(this.siqFile, "cp437");
      let app = this;
      //TODO add progress tracking
      data.forEach(async function (entry) {
        if (entry.filename.startsWith("Images/")) {
          app.imagesFiles.push(entry.getData(new zip.BlobWriter()));
        } else if (entry.filename.startsWith("Audio/")) {
          app.audioFiles.push(entry.getData(new zip.BlobWriter()));
        } else if (entry.filename.startsWith("Video/")) {
          app.videoFiles.push(entry.getData(new zip.BlobWriter(), {}));
        } else if (entry.filename.startsWith("content")) {
          app.contentFile = entry.getData(new zip.BlobWriter());
        }
      });
      //parse content.xml blob to js object
      const contentFile = await this.contentFile;
      const xmlText = await contentFile.text();
      const contentText = xmlJs.xml2json(xmlText, {
        compact: false,
        spaces: 4,
      });
      const content = JSON.parse(contentText);
      this.paseContentFile(content);

      //TODO send data to server
    },
    getFileContent(file, options) {
      return new zip.ZipReader(new zip.BlobReader(file)).getEntries(options);
    },
    paseContentFile(content) {
      this.$log.debug("Parsing pack file");
      const pack = content.elements[0];
      this.pack.name = pack.attributes.name;
      this.pack.difficulty = pack.attributes.difficulty;
      this.pack.date = pack.attributes.date;

      let roundsData;
      pack.elements.forEach((element) => {
        if (element.name == "rounds") {
          roundsData = element.elements;
        }
      });

      //[]Rounds
      let rounds = [];
      roundsData.forEach((roundData) => {
        let round = { final: false, themes: [] };
        round.name = roundData.attributes.name;
        //finals has different structure
        if (roundData.attributes?.type == "final") {
          round.final = true;
          roundData.elements[0].elements.forEach((themeData) => {
            let theme = {};
            theme.name = themeData.attributes.name;
            themeData.elements[0].elements[0].elements.forEach((element) => {
              if (element.name == "right") {
                theme.answer = element.elements[0].elements[0].text;
              }
              if (element.name == "scenario") {
                theme.question = element.elements[0].elements[0].text;
              }
            });
            round.themes.push(theme);
          });
          rounds.push(round);
          return;
        }
        //round.[]themes
        roundData.elements[0].elements.forEach((themeData) => {
          let theme = { questions: [] };
          theme.name = themeData.attributes.name;
          console.log(themeData);
          //round.theme.[]questions
          themeData.elements[0].elements.forEach((questionData) => {
            let question = {};
            question.price = questionData.attributes.price;
            //geting question parameters
            questionData.elements.forEach((data) => {
              //this is question
              //TODO multiple questions (например текст и видео)
              if (data.name == "scenario") {
                //find question
                data.elements.forEach((element) => {
                  if ("attributes" in element) {
                    question.type = element.attributes.type;
                    question.question = element.elements[0].text;
                  }
                });
              }
              //this is answer
              //TODO multiple answers (для ведущиего и общий (видео например))
              if (data.name == "right") {
                question.answer = data.elements[0].elements[0].text;
              }
            });
            theme.questions.push(question);
          });
          round.themes.push(theme);
        });
        rounds.push(round);
      });
      this.pack.rounds = rounds;
    },
  },
};
</script>

<style scoped>
.packInfo {
  position: absolute;
  left: 50px;
  top: 150px;
  text-align: left;
}
</style>
