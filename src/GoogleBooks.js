var GoogleBooks = {
	init: function(){
		$("#searchButton").click(GoogleBooks.reset)
		$("#searchButton").click(GoogleBooks.search)
	},
	search: function(){	
		var result = document.getElementById("searchText").value;
		$.ajax(
			{
			"url": "https://www.googleapis.com/books/v1/volumes",
			"type" : "get",
			"data": {
				"q": result
			},
			success: function(data){
				for(var i = 0; i<data.items.length;i++)
				{
					var item = data.items[i]
					$("#searchResults").append("<div id ="+i+" class=book>" + item.volumeInfo.title +
					" " + item.volumeInfo.authors.join(',') + " " + item.volumeInfo.publisher +
					" " + item.volumeInfo.publishedDate 
					+ "</div>") 
					$("<div id = img"+i+" class=image><img src='" + item.volumeInfo.imageLinks.smallThumbnail +"'/></div").appendTo("#searchResults")
					$("<div id = description"+i+" class=description>" + "More Details " +  "Rating: " + item.volumeInfo.averageRating + " " + " Page Count: " + item.volumeInfo.pageCount + " Type: " + item.volumeInfo.printType + " Description: " + item.volumeInfo.description + "</div>").appendTo("#searchResults")
					$("<div id = previewLink"+i+" class=link><a href="+item.volumeInfo.previewLink+">Visit For More Information</a></div>").appendTo("#searchResults");
				}
				$(".book").click(function(){
					var divId = "#description"+this.id;
					var imgId = "#img"+this.id;
					var previewLinkId = "#previewLink"+this.id;
					console.log(divId);
					$(divId).toggle();
					$(imgId).toggle();					
					$(previewLinkId).toggle();
				});
			}
			});
	},
	reset: function(){
			$(".link, .description, .image, .book").remove();
	},
}