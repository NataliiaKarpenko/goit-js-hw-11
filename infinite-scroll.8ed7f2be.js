!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequired7c6=a);var o=a("bpxeT"),i=a("2TvXO"),s=a("h6c0i"),c=a("5IjG7"),u=a("8MBJY"),l=a("a2hTj"),p=a("hKHmD"),f=a("dIxxU"),h=function(){"use strict";function t(){e(u)(this,t),this.q=null,this.page=null,this.per_page=10}return e(l)(t,[{key:"fetchPhotosByQuery",value:function(){var e={params:{q:this.q,page:this.page,per_page:this.per_page,image_type:"photo",orientation:"horisontal",safesearch:!0}};return f.default.get("".concat(t.BASIC_URL,"?key=").concat(t.API_KEY),e)}}]),t}();e(p)(h,"BASIC_URL","https://pixabay.com/api/"),e(p)(h,"API_KEY","33069877-56d6b4be23d42e6d3f03db65c"),console.log(h);var d=a("6MX1w"),y=document.querySelector(".search-form"),g=document.querySelector(".gallery"),v=new h;function w(){return(w=e(o)(e(i).mark((function t(r){var n,a;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.preventDefault(),v.q=r.target.elements.searchQuery.value,v.page=1,t.prev=3,t.next=6,v.fetchPhotosByQuery();case 6:if(n=t.sent,0!==(a=n.data).hits.length){t.next=13;break}return s.Notify.failure("Sorry, there are no images matching your search query. Please try again."),r.target.reset(),g.innerHTML="",t.abrupt("return");case 13:s.Notify.success("Hooray! We found ".concat(a.totalHits," images.")),g.innerHTML=(0,d.createGallery)(a.hits),new(e(c))(".gallery a"),t.next=21;break;case 18:t.prev=18,t.t0=t.catch(3),console.log(t.t0);case 21:case"end":return t.stop()}}),t,null,[[3,18]])})))).apply(this,arguments)}function m(){return(m=e(o)(e(i).mark((function t(r){var n,a;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight)){t.next=15;break}return v.page+=1,t.prev=2,t.next=5,v.fetchPhotosByQuery();case 5:n=t.sent,(a=n.data).totalHits-v.per_page*v.page<=0&&s.Notify.warning("We're sorry, but you've reached the end of search results."),g.insertAdjacentHTML("beforeend",(0,d.createGallery)(a.hits)),new(e(c))(".gallery a").refresh(),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(2),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[2,12]])})))).apply(this,arguments)}y.addEventListener("submit",(function(e){return w.apply(this,arguments)})),window.addEventListener("scroll",(function(e){return m.apply(this,arguments)}))}();
//# sourceMappingURL=infinite-scroll.8ed7f2be.js.map
