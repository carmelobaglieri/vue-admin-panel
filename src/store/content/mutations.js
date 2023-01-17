import $ from 'jquery'

export function setModal(state, val){
   state.modal = { ...state.modal, ...val }
   $(document.body).addClass('hidden')
}

export function destroyModal(state){
   state.modal= { 
      head: '', 
      body: '', 
      background: '', 
      isVisible: false, 
      isTutorial: false, 
      onClose: null, 
      onConfirm: null, 
      confirmText: 'Conferma', 
      bodyComponent: false 
   }
   $(document.body).removeClass('hidden')
}

export function setPage(state, val) {
   state.contents.pages[val.key] = val.value
   localStorage.setItem('contents', JSON.stringify(state.contents));
}

export function setContents(state, val) {
   val = (val == null) ? {posts:[],corsi:[],pages:{}} : val;
   state.contents = val
   localStorage.setItem('contents', JSON.stringify(val));
}

export function setStrings(state, val) {
   state.strings = val || {};
   localStorage.setItem('strings', JSON.stringify(state.strings));
}

export function setAppData(state, val) {
   state.appData = val || {};
   localStorage.setItem('appData', JSON.stringify(state.appData));
}

export function setPageLoading(state, val) {
   state.page_loading = val || false;
}