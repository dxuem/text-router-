<template>
  <div>
    <a-auto-complete
      :data-source="dataSource"
      style="width: 200px"
      placeholder="input here"
      @select="onSelect"
      @search="onSearch"
    />
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      dataSource: [],
    };
  },
  methods: {
    onSearch(searchText) {
      this.dataSource = !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)];
    },
    onSelect(value) {
      console.log('onSelect', value);
    },
    onChange(value) {
      this.value = value;
    },
  },
};
</script>
