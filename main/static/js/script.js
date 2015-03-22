var ProjectView = function() {
    that = this;

    this.pageSize = 10;
    this.nextNextUrl = null;
    this.projects = {
        inView: [],
        nextBuffer: [],
    };

    $(function(){
        $('button.filter').click(function(){
            that.refresh($(this).data('category'));
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
    $.get('/api/project/', params).done(function(data){
        // clear existing projects in view/buffer
        while(that.projects.inView.length > 0) {
            that.projects.inView.pop();
        }
        that.projects.nextBuffer = []
        that.projects.nextBuffer = data.results;
        that.nextNextUrl = data.next;
        that.displayNextPage();
    }).fail(function(){
        // TODO
    });
    
    this.loadNextPage();

    // if(this.binding != undefined) this.binding.unbind();
    this.binding = rivets.bind($('#projects'), {projects: this.projects.inView});
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