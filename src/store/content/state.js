
export default function () {

   return {
      contents: JSON.parse(localStorage.getItem('contents')) || {posts:{},pages:{}},
      strings: localStorage.getItem('strings') || {},
      appData: JSON.parse(localStorage.getItem('appData')) || {},
      page_loading: false,
      modal: { 
         head: '', 
         body: '', 
         background: '', 
         isVisible: false, 
         isTutorial: false, 
         onClose: null, 
         onConfirm: null, 
         confirmText: 'Conferma', 
         bodyComponent: false 
      },
   }
}