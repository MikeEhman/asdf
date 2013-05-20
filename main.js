(function ($) {

    // Backbone

    Backbone.sync = function (method, model, success, error) {

    }

    var ViewList = [];

    // Helper Fuctions

    var askServer = function (nameData, tasteData) {
        /** sends a query to http://localhost:8888/ask
            and use the response to write onto the '#response'
        *   Arguements:
            name -- name of the fruit
            taste -- taste of the fruit

            Executes:
            Gets the response and writes to '#response' label element.
        */

        reqData = {};
        reqData.name = nameData;
        reqData.taste = tasteData;

        $.ajax({
            url: 'http://localhost:8888',
            data: {
                jsonData: JSON.stringify(reqData)
            },
            dataType: 'jsonp',
            jsonpCallback: "_cb",
            cache: false,
            success: function (dataObj) {
                alert("Response received: " + dataObj);
                $('#response').html(dataObj.content);
            },
            error: function (fqXHR, textStatus, errorThrown) {
                alert('error: ' + textStatus + " " + errorThrown);
            }
        });
    }

    // Model

    var Fruit = Backbone.Model.extend({
        defaults: {
            name: "SomeFruit",
            taste: "good",
            id: 0
        }
    });

    var FruitList = Backbone.Collection.extend({
        model: Fruit
    });

    // View

    var FruitView = Backbone.View.extend({

        tagName: 'tr',

        events: {
            "click td": "transfer"
        },

        initialize: function () {
            _.bindAll(this);
            this.model.bind('remove', this.unrender, this);
            this.render();
        },

        render: function () {
            $(this.el).html('<td data-toggle="tooltip" title="Tastes ' + this.model.get("taste") + '">' + this.model.get("name") + '</td>');
            return this;
        },

        unrender: function () {
            $(this.el).remove();
        },

        transfer: function () {
            askServer(this.model.get("name"), this.model.get("taste"));
            if (secondListView.collection.contains(this.model)) {
                fruitListView.receiveFruit(this.model);
            } else {
                secondListView.receiveFruit(this.model);
            }
            this.remove();
        },

        remove: function () {
            this.model.destroy();
        }

    });

    var FruitListView = Backbone.View.extend({

        el: $('body'),

        events: {
            "click button": "addFruit",
        },

        initialize: function () {
            _.bindAll(this, 'render', 'addFruit', 'appendFruit', 'receiveFruit');
            this.collection = new FruitList();
            this.collection.bind('add', this.appendFruit, this);
            this.idCount = 0;
            this.render();
        },

        render: function () {
            var self = this;
            _(this.collection.models).each(function (fruit) {
                $(self.el).appendFruit(fruit);
            }, this);
            return this;
        },

        addFruit: function () { // add fruit to fruitlist
            fruitName = $('#nameInput').val();
            fruitTaste = $('#tasteInput').val();
            $('button').button('reset');
            $('#nameInput').val("");
            $('#tasteInput').val("");
            this.idCount++;
            fruit = new Fruit({
                name: fruitName,
                taste: fruitTaste,
                id: this.idCount
            });
            this.collection.add(fruit);
        },

        appendFruit: function (fruit) { // append fruitview to fruitlistview
            fruitView = new FruitView({
                model: fruit
            });
            $('#add_table', this.el).append(fruitView.render().el); // attach the view to the viewlist's window
        },

        receiveFruit: function (fruit) {
            newFruit = new Fruit({
                name: fruit.get("name"),
                taste: fruit.get("taste"),
                id: fruit.get('id')
            });
            this.collection.add(newFruit);
        },

    });

    var SecondListView = Backbone.View.extend({

        el: $('body'),

        initialize: function () {
            _.bindAll(this, 'render', 'appendFruit', 'receiveFruit');
            this.collection = new FruitList();
            this.collection.bind('add', this.appendFruit, this);
            this.render();
        },

        render: function () {
            var self = this;
            _(this.collection.models).each(function (fruit) {
                $(self.el).appendFruit(fruit);
            }, this);
            return this;
        },

        appendFruit: function (fruit) { // append fruitview to fruitlistview
            fruitView = new FruitView({
                model: fruit
            });
            $('#table2', this.el).append(fruitView.render().el); // attach the view to the viewlist's window
        },

        receiveFruit: function (fruit) {
            newFruit = new Fruit({
                name: fruit.get("name"),
                taste: fruit.get("taste"),
                id: fruit.get('id')
            });
            this.collection.add(newFruit);
        }

    });

    var fruitListView = new FruitListView();
    var secondListView = new SecondListView();

    // Templating

    // Bootstrap


    $(document).ready(function () {

        $('#addbutton').mouseenter(function () {
            $('#addbutton').popover('show');
        });

        $('#addbutton').mouseleave(function () {
            $('#addbutton').popover('hide');
        });

        $('#addbutton').click(function () {
            $('#addbutton').button('loading');
        });

        $('#add_table').on('mouseenter', 'td', function () {
            $(this).tooltip('show');
        });

        $('#add_table').on('mouseleave', 'td', function () {
            $(this).tooltip('hide');
        });

        $('#table2').on('mouseenter', 'td', function () {
            $(this).tooltip('show');
        });

        $('#table2').on('mouseleave', 'td', function () {
            $(this).tooltip('hide');
        });

    });


})(jQuery);