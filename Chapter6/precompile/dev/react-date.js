var ShowDate = React.createClass({
    getDefaultProps:function(){
        return{
            today:new Date().toISOString()
        };
    },
    render: function() {
        return (
            <h1>
            Today: {this.props.today}
            </h1>
        );
    }
});
React.render(<ShowDate/>, document.body);