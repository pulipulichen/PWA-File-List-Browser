import $ from 'jquery'

//import createSqlWasm from "./sql-wasm/sql-wasm-browser";
//import initSqlJs from 'sql.js'

//import initSqlJs from './sql-wasm/sql-wasm.js'
//import 'sql-wasm'

/* global Node, fetch, Promise */
let Index = {
  props: ['config', 'localConfig', 'utils'],
  data () {    
    this.$i18n.locale = this.config.localConfig
    return {
      columns : [],
      values : []
    }
  },
  components: {
  },
  computed: {
    
  },
  mounted: async function () {
    const sqlPromise = initSqlJs({
      locateFile: file => "./src/vendors/sql.js/sql-wasm.wasm"
    });
    const dataPromise = fetch('./sqlite/foobar.sqlite').then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf));
    let result = db.exec('select * from cats')
    // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
    /*
    console.log(result[0])
    
    let output = result[0].values.map(rowArray => {
      let row = {}
      result[0].columns.forEach((c, i) => {
        row[c] = rowArray[i]
      })
      return row
    })
    
    console.log(output)
    */
    this.columns = result[0].columns
    this.values = result[0].values
  },
  
//  watch: {
//  },
  methods: {
  }
}

export default Index