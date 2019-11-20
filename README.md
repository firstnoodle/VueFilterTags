# Resizable select for a filterOperator ui component

#### UI components for sorting, filtering and paginating datasets. Screenshot will follow.
There will be individual components for each type:
- sortingComponent
- filterComponent
– paginationComponent 

#### 2 dependencies will be used:
- popper.js for positioning dropdowns
- vue-perfect-scrollbar for adding scrollbars
– vue-lottie for showing loader animation

#### 3 different modes:
1. Button
2. Filter - filter content
3. Remote - fetch options via API

#### Current status

- [x] highlight letters that matches filter query
- [x] highligt using arrow keys
- [x] caseinsensitive
- [ ] REFACTOR - the element-ui structure is not needed. Pass options as prop on eeSelect instead of via slot!!
- [ ] select option
- [ ] highlight selected option
- [ ] when there are no options
- [ ] handle popper
- [ ] handle remote
- [ ] eeLoader
- [ ] handle button
