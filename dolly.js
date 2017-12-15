/* global $ */
(function () {
  var Dolly = function (el) {
    this.$el = $(el)
    this.template = this.$el.find('script').html()
    this.$container = this.$el.find('[data-dolly="container"]')
    this.attachEvents()
  }

  Dolly.prototype.attachEvents = function () {
    var _this = this
    this.$el.on('click.dolly', '[data-dolly="do"]', function () {
      _this.clone()
    })

    this.$el.on('click.dolly', '[data-dolly="kill"]', function () {
      $(this).closest('[data-dolly="container"] > *').remove()
    })
  }

  Dolly.prototype.massacre = function () {
    this.$container.empty()
    this.$el.trigger('massacre.dolly')
  }

  Dolly.prototype.clone = function () {
    var $sheep = $(this.template).appendTo(this.$container)
    this.$el.trigger('new.dolly', $sheep)
  }

  Dolly.prototype.destroy = function () {
    this.massacre()
    this.$el.off('*.dolly')
  }

  $.fn.dolly = function (method) {
    var args = [].slice.call(arguments, 1)
    this.each(function () {
      var plugin = $.data(this, 'plugin-dolly')
      if (!plugin) {
        plugin = new Dolly(this)
        $.data(this, 'plugin-dolly', plugin)
      }
      if (plugin[method]) {
        plugin[method].apply(plugin, args)
      }
    })
  }
})()
