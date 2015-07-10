rivets.configure({
    // Attribute prefix in templates
    prefix: 'rv',
    // Preload templates with initial data on bind
    preloadData: false,
    // Root sightglass interface for keypaths
});

var ProjectView = function() {
    that = this;

    this.pageSize = 10;
    this.nextNextUrl = null;
    this.projects = {
        inView: [],
        nextBuffer: [],
    };

    $(function(){
        that.binding = rivets.bind($('#projects'), {projects: that.projects.inView});
        $('button.filter').click(function(){
            that.refresh($(this).data('category'));
            $('button.filter').removeClass('selected');
            $(this).addClass('selected');
        });
        that.refresh();
    });
}

ProjectView.prototype.refresh = function(category) {
    that = this;

    var params = {
        "page_size": this.pageSize, 
        "category": category == 'all' ? '' : category,
    };
    $.get('/api/projects/', params).done(function(data){
        var $projects = $('#projects');
        
        while(that.projects.inView.length > 0) that.projects.inView.pop();

        that.projects.nextBuffer = data.results;
        that.nextNextUrl = data.next;
        that.displayNextPage();

        imagesLoaded(projects, function() {
            $projects.masonry('destroy');
            $projects.masonry({
                // options
                columnWidth: 305,
                itemSelector: 'article',
                isFitWidth: true,
                gutter: 20,
            });
            $projects.masonry( 'on', 'layoutComplete', function(msnryInstance, laidOutItems){
                console.log(laidOutItems);
            });
        });
        that.loadNextPage();

    }).fail(function(){
        // TODO
    });
    

};

ProjectView.prototype.loadNextPage = function() {
    $.get(this.nextNextUrl).done(function(data){
        that.projects.nextBuffer = data.results;
        that.nextNextUrl = data.next;
    }).fail(function(){
        // TODO
    });
};

ProjectView.prototype.displayNextPage = function() {
    for (var i = 0; i < this.projects.nextBuffer.length; i++) {
        this.projects.inView.push(this.projects.nextBuffer[i]);
    }
    this.projects.nextBuffer = [];
    if(this.nextNextUrl) this.loadNextPage();
};