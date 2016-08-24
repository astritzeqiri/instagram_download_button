Vue.config.debug = true;
Vue.config.devtools = true;

Vue.component('instagram-image', {
	template: "#instagram-image",
	props: ["image"],
	ready: function(){
		var self = this;
		chrome.storage.sync.get(null, function(data){
			self.isDownloaded = data[self.idGenerated] != undefined;
		});
	},
	data: function(){
		return {
			isDownloaded: false
		}
	},
	methods: {
		imageDownloaded: function() {
			var self = this;
			var idGenerated = this.idGenerated;
			var saveObj = {};
			saveObj[idGenerated] = true;

			chrome.storage.sync.set(saveObj, function(){
				self.isDownloaded = true;
			});
		},
	},
	computed: {
		idGenerated: function() {
			return this.image.id.split('/')[2];
		}
	}
});
new Vue({
	el: "#list_of_photos",
	ready: function(){
		chrome.runtime.sendMessage({ type: "getImagesFirst" }, this.onImagesFetched);
		setInterval(this.fetchImages, 1000);
	},
	data: {
		count : 0,
		images: [],
		loading: false
	},
	computed: {
		count: function(){
			return this.images.length;
		}
	},
	methods: {
		fetchImages: function() {
			var self = this;
			chrome.runtime.sendMessage({ type: "getImages" }, this.onImagesFetched);
		},
		onImagesFetched: function(fetchedImages) {
			var self = this;
			if (fetchedImages != undefined && fetchedImages.length > 0) {
				self.loading = true;
				self.images = fetchedImages;
				self.loading = false;
			}
		}
	}
});
