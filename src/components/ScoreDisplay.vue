<template>
  <div>
    <vue-json-pretty
      :path="'../data/LocalLeaderBoardsJoey.json'"
      :data="{ key: 'value' }"
    ></vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  name: 'ScoreDisplay',

  components: {
    VueJsonPretty,
  },

  props: {

  },

  data() {
    return { };
  },
};
</script>

<style scoped>

</style>
