
# UI components for sorting, filtering and paginating datasets. 
Screenshot will follow.
There will be individual components for each type:
- sortingComponent
- filterComponent
– paginationComponent 

#### 2 dependencies will be used:
- popper.js for positioning dropdowns
- vue-perfect-scrollbar for adding scrollbars
– vue-lottie for showing loader animation

## The Filter Component
Both the sorting and filter components will be using a select/dropdown for selecting columns (and operator for the filter).
The select will in turn consist of a resizable input (or a button depending on mode) and a popper for the options (which will be wrapped in a perfect-scrollbar)
The options passed to the select should define a template ...

#### 3 different modes:
1. Button
2. Filter - filter content
3. Remote - fetch options via API

#### Current status

- [x] highlight letters that matches filter query
- [x] highligt using arrow keys
- [x] caseinsensitive
- [x] handle popper
- [x] select option
- [ ] create top-level component click/focus (controlling input focus/blur)
- [ ] highlight selected option
- [ ] when there are no options
- [ ] handle remote
- [ ] eeLoader
- [ ] handle button
- [ ] REFACTOR - the element-ui structure is not needed. Pass options as prop on eeSelect instead of via slot!!
