import {loopRange} from '../utils/misc.js';

export default {
  name: "optionsFilter",
  props: {
    type: {
      type: String,
      required: true,
      validator: value => {
        return ["button", "filter", "api"].indexOf(value) !== -1;
      }
    },
    value: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      highlightedOption: null,
      optionCount: 0,
      filteredVNodes: [],
      keyIncrementor: 0,
    };
  },

  mounted() {
    this.filteredVNodes = this.$slots.default.filter(vNode => {
      return vNode.componentOptions.propsData.label.includes(this.value);
    });

    this.$parent.$parent.$parent.$on('highlight', this.updateHighlight);
    this.$parent.$parent.$parent.$on('selectHighlighted', this.selectHighlighted);
  },

  watch: {
    value(newValue, oldValue) {
      const regex = new RegExp(newValue, 'i');
      this.filteredVNodes = this.$slots.default.filter(vNode => {
        return vNode.componentOptions.propsData.label.match(regex);
      });

      if (this.filteredVNodes.length !== this.optionCount) this.highlightedOption = null;
      this.optionCount = this.filteredVNodes.length;
    }
  },

  methods: {
    markStringMatch(string, query) {
        const reg = "(" + query + ")(?![^<]*>|[^<>]*</)"; 
        const regex = new RegExp(reg, "i");
        
        const matchStartPosition = string.match(regex).index;
        const matchEndPosition = matchStartPosition + string.match(regex)[0].toString().length;
       
        return [{
            value: string.slice(0, matchStartPosition),
            highlight: false 
          },
          {
            value: string.slice(matchStartPosition, matchEndPosition),
            highlight: true
          },
          {
            value: string.slice(matchEndPosition, string.length),
            highlight: false 
          }
        ];
    },
    onOptionMouseOver(event) {
      const options = this.$el.children;
      let index = 0;
      for(const option of options) {
        if(option === event.target) {
          this.highlightedOption = index;
        }
        index++;
      }
    },
    onSelect(event, data) {
      console.log(event, data);  
      // this.$parent.$parent.$parent.$emit('click', node.componentOptions.propsData)
    },
    selectHighlighted() {
      console.log(this.filteredVNodes[this.highlightedOption].componentOptions.propsData.label);
    },
    updateHighlight(direction) {
      if(this.highlightedOption === null) {
        this.highlightedOption = direction === 1 ? 0 : this.optionCount-1;
      } else {
        this.highlightedOption = loopRange(this.highlightedOption+direction, this.optionCount)
      }
      this.$emit('highlightChange', this.highlightedOption);
    },
  },

  render: function(createElement) {
    return createElement(
      "div", // tag name
      {},
      this.filteredVNodes.map((node,index) => {

        // highlight search match 
        const stringSegments = this.markStringMatch(node.componentOptions.propsData.label, this.value);
        const stringNodes = stringSegments.map(item => {
          if(item.value.length) {
            return createElement(
              'span',
              {
                class: {
                  'is-marked': item.highlight
                }
              },
              item.value 
            )
          }
        })

        return createElement('div', {
          key: node.key,
          class: {
            'ee-option': true,
            'is-highlighted': index === this.highlightedOption
          },
          on: {
            mouseover: this.onOptionMouseOver,
            click: this.onSelect
          }
        },
        stringNodes
        )
      })
    );
  }
};
