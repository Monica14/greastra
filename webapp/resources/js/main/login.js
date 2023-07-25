$(function() {
			$.Class('gts.attendance.asca.login.Main', {}, {
						init : function(el, options) {
							this.el = $(el);
							this.options = $.extend({}, {}, options);

							this.elForm = $('form', this.el);

							this.elForm.validate({
										rules : {
											url : {
												required : true
											},
											user : {
												required : true
											},
											password : {
												required : true
											},
											proxyPort : {
												number : true
											}
										}
									});

							this.elInputUrl = $('input[name="url"]',
									this.elForm).on('change',
									this.proxy("_onUrlChange"));

							this.elForm.on('submit', this
											.proxy('_onLoginClick'));
							this.btnLogin = $('button.login', this.el).on(
									'click', this.proxy('_onLoginClick'));

							this.btnProxy = $('.network-proxy', this.el).on(
									'click', this.proxy('_onProxyClick'));
							this.elProxySettings = $('.proxy-settings', this.el)
						},

						_onUrlChange : function() {
							var val = this.elInputUrl.val();

							if (val && !(/http[s]?:\/\/.*/.test(val))) {
								this.elInputUrl.val('https://' + val);
							}
						},

						_onLoginClick : function(e) {
							e.preventDefault();
							if (!this._loginInProgress && this.elForm.valid()) {
								this.btnLogin.attr('disabled', 'disabled');
								this._loginInProgress = true;
								$.ajax({
											url : GtsUtils.getContextPath()
													+ '/login',
											type : 'POST',
											timeout: 300000,
											data : this.elForm.serialize()
										}).always($.proxy(function() {
											this.btnLogin
													.removeAttr('disabled');
											this._loginInProgress = false;
										}, this));
							}
						},

						_onProxyClick : function(e) {
							e.preventDefault();
							this.elProxySettings.toggle();
						}
					});
		});