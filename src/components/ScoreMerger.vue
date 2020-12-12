<template>
  <div>
    <textarea class="copy-area" v-model="copyableJson"></textarea>
    <div class="viewer">
      <h2>Merged JSON</h2>
      <json-viewer
          :value="mergedJson"
          :expand-depth="3"
          boxed
      ></json-viewer>
      <h2>Joey JSON</h2>
      <json-viewer
          :value="joeyJson"
          :expand-depth="3"
          :expanded="false"
          boxed
      ></json-viewer>
      <h2>Jro JSON</h2>
      <json-viewer
          :value="jroJson"
          :expanded="false"
          boxed
      ></json-viewer>
      <h2>Wang JSON</h2>
      <json-viewer
          :value="wangJson"
          :expand-depth="3"
          :expanded="false"
          boxed
      ></json-viewer>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import JsonViewer from 'vue-json-viewer';
import 'vue-json-viewer/style.css';
import JOEY_JSON from '@/data/LocalLeaderboardsJOEY.json';
import JRO_JSON from '@/data/LocalLeaderboardsJRO.json';
import WANG_JSON from '@/data/LocalLeaderboardsWANG.json';

export default {
  name: 'ScoreMerger',

  components: {
    JsonViewer,
  },

  data() {
    return {
      joeyJson: JOEY_JSON._leaderboardsData,
      jroJson: JRO_JSON._leaderboardsData,
      wangJson: WANG_JSON._leaderboardsData,
      testJson1: [{
        _leaderboardId: 'AirNormal',
        _scores:
            [{
              _score: 144701,
              _playerName: 'FOO',
              _fullCombo: true,
              _timestamp: 1599968866,
            }],
      }, {
        _leaderboardId: 'EarthNormal',
        _scores:
            [{
              _score: 177352,
              _playerName: 'BAR',
              _fullCombo: true,
              _timestamp: 1599969253,
            }, {
              _score: 164665,
              _playerName: 'FOO',
              _fullCombo: false,
              _timestamp: 1599970971,
            }],
      }],
      testJson2: [{
        _leaderboardId: 'EarthNormal',
        _scores:
            [{
              _score: 177352,
              _playerName: 'BASH',
              _fullCombo: false,
              _timestamp: 1512969017,
            }, {
              _score: 164665,
              _playerName: 'FOO',
              _fullCombo: false,
              _timestamp: 1599970971,
            }],
      }, {
        _leaderboardId: 'FireNormal',
        _scores:
            [{
              _score: 124701,
              _playerName: 'FOO',
              _fullCombo: true,
              _timestamp: 1591954866,
            }],
      }],
    };
  },

  computed: {
    mergedJson() {
      // TEST VARIABLES FOR MERGE
      // return this.jsonMerge(this.testJson1, this.testJson2);
      const temp = this.jsonMerge(this.joeyJson, this.jroJson);
      return this.jsonMerge(temp, this.wangJson);
    },

    copyableJson() {
      return JSON.stringify({ _leaderboardsData: this.mergedJson });
    },
  },

  // watch: {
  //   mergedJson() {
  //     this.copyableJson = { "_leaderboardsData": this.mergedJson }
  //     JSON.stringify(this.copyableJson);
  //     console.log('copyable', this.copyableJson)
  //   }
  // },

  methods: {
    pretty(value) {
      return JSON.stringify(value, null, 2);
    },

    jsonMerge(json1, json2) {
      const merged = json1;

      Object.values(json2).forEach((song) => {
        if (_.some(json1, ['_leaderboardId', song._leaderboardId])) {
          console.log('not new song so merged scores for: ', song);
          // target song in the merged list to add combined scores.
          const foundMatch = _.find(merged, { _leaderboardId: song._leaderboardId });

          // set new combined score list to song in the list
          foundMatch._scores = this.mergeScores(foundMatch._scores, song._scores);
        } else {
          // Assumes new song so add to list.
          console.log('new song so append: ', song);
          merged.push(song);
        }
      });

      console.log('NEW MERGED LIST : ', merged);
      return merged;
    },

    /**
     * Merge two array of scores together and de-dupe
     * @param scoresArr1
     * @param scoresArr2
     * @returns sorted array of the scores with no duplicates
     */
    mergeScores(scoresArr1, scoresArr2) {
      const mergedScores = scoresArr1;
      scoresArr2.forEach((score) => {
        if (_.some(scoresArr1, score)) {
          console.log('score already exists... skipping:', score);
        } else {
          mergedScores.push(score);
        }
      });
      return _.orderBy(mergedScores, ['_score'], ['desc']);
    },
  },

  props: {

  },
};
</script>

<style scoped>
.copy-area {
  width: 75%;
  height: 500px;
}
.viewer {
  margin-left: 10px;
  text-align: left;
}
</style>
