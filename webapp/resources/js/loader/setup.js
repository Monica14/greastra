$(function() {
	$.Class('gts.attendance.asca.loader.setup.Main', {}, {
		init : function(el, options) {
			this.el = $(el);
			$.extend(this.options, options);
			this.btnPrev = $('.wizard-prev', this.el).on('click',
					this.proxy('_onWizardPrevClick'));
			this.btnNext = $('.wizard-next', this.el).on('click',
					this.proxy('_onWizardNextClick'));
			this.btnCancel = $('.wizard-cancel', this.el).on('click',
					this.proxy('_onWizardCancelClick'));
			this.btnFinish = $('.wizard-finish', this.el).on('click',
					this.proxy('_onWizardFinishClick'));

			this.elWizardStorageType = $('.wizard-panel.storage-type');

			this.elWizardFileDetails = $('.wizard-panel.storage-file-det');
			this.elWizardDbDetails = $('.wizard-panel.storage-db-det');

			this.elWizardFieldMappingCSV = $('.wizard-panel.fields-csv');

			this.btnWizardActions = $('.wizard-actions .wizard-btn', this.el);

			this.elFieldFormatModal = $('.field-format-settings', this.el);

			$.templates(this.options.tmpl.csvFieldMapping, $(
							'script.tmpl-csv-field-mapping', this.el)[0]);
			$.templates(this.options.tmpl.csvFieldMappingField, $(
							'script.tmpl-csv-field-mapping-field', this.el)[0]);
			$
					.templates(this.options.tmpl.fieldFormatDt, $(
									'script.tmpl-field-format-settings-dt',
									this.el)[0]);
			$.templates(this.options.tmpl.inOutFormatDt, $(
							'script.tmpl-field-inout-settings-dt', this.el)[0]);

			$('form', this.elWizardStorageType).validate({
						rules : {
						    'installationName' : {
						    	required : true
						    },
							'fileType' : {
								required : true
							},
							'vendor' : {
								required : true
							}
						}
					});
			$('form', this.elWizardFileDetails).validate({
						rules : {
							'examplefile' : {
								required : !this.options.config
							},
							'fileLocation' : {
								required : true
							},
							'fileDateFormat' : {
								required : true
							},
							'fileExtension' : {
								required : true
							},
							'notes' : {
								required : true
							}
						}
					});
			$('form', this.elWizardDbDetails).validate({
						rules : {
							'dbProvider' : {
								required : true
							},
							'fileLocation' : {
								required : {
									depends: function(element){
										var providerName = $("input[name=dbProvider]").val();
							            return providerName == 'msaccess';
							        }
								}
							},
							'dbName' : {
								required : true
							},
							'notes' : {
								required : true
							},
							'dbTablePrefix':{
								required : {
									depends: function(element){
							            return $("#dbIsDynamicTable").prop('checked');
							        }
								}
							
							},
							'dbTableFormat':{
								required : {
									depends: function(element){
							            return $("#dbIsDynamicTable").prop('checked');
							        }
								}
							
							}
						}
					});

			if (this.options.config.fileType) {
				$(':input[name="installationName"]', this.elWizardStorageType).val(this.options.config.installationName);
				$(':input[name="fileType"]', this.elWizardStorageType).select2(
						{
							data : this.options.storageTypes,
							initSelection : $.proxy(
									function(element, callback) {
										var storageType = this.options.storageTypes;
										for (var i = 0; i < storageType.length; i++) {
											if (storageType[i].id == this.options.config.fileType) {
												callback({
															id : storageType[i].id,
															text : storageType[i].text
														});
											}

										}

									}, this)

						});

				$(':input[name="vendor"]',
				this.elWizardStorageType)
				.select2(
						{
							data : this.options.vendorItem,
							initSelection : $
									.proxy(
											function(
													element,
													callback) {
												var vendorItem = this.options.vendorItem;
												for (var i = 0; i < vendorItem.length; i++) {
													if (vendorItem[i].id == this.options.config.vendor) {
														callback({
															id : vendorItem[i].id,
															text : vendorItem[i].text
														});
													}
												}
											}, this)
						});

				$(':input[name="fileType"]', this.elWizardStorageType).select2(
						'val', this.options.config.fileType);
				$(':input[name="vendor"]', this.elWizardStorageType).select2(
						'val', this.options.config.vendor);
				$(':input[name="fileLocation"]')
						.val(this.options.config.fileLocation);
				$(':input[name="filePrefix"]')
				.val(this.options.config.filePrefix);
				$(':input[name="fileSuffix"]')
				.val(this.options.config.fileSuffix);
				if (this.options.config.fileType == 'jdbc') {
					var jdbcData = this.options.config;
					$(':input[name="dbHost"]', this.elWizardDbDetails)
							.val(jdbcData.dbHost)
					$(':input[name="dbPort"]', this.elWizardDbDetails)
							.val(jdbcData.dbPort)
					$(':input[name="dbName"]', this.elWizardDbDetails)
							.val(jdbcData.dbName)
					$(':input[name="fileLocation"]', this.elWizardDbDetails)
							.val(jdbcData.fileLocation);
					$(':input[name="dbUserName"]', this.elWizardDbDetails)
							.val(jdbcData.dbUserName)
					$(':input[name="dbPassword"]', this.elWizardDbDetails)
							.val(jdbcData.dbPassword)
					$(':input[name="dbSchemaName"]', this.elWizardDbDetails)
							.val(jdbcData.dbSchemaName)
					$('textarea[name="notes"]', this.elWizardDbDetails)
							.val(jdbcData.notes)
					if (jdbcData.dbIsDynamicTable) {
						$(':input[name="dbIsDynamicTable"]', this.elWizardDbDetails)
						.prop('checked', true);
					}
					$(':input[name="dbTableSuffix"]', this.elWizardDbDetails)
							.val(jdbcData.dbTableSuffix)
					$(':input[name="dbTablePrefix"]', this.elWizardDbDetails)
							.val(jdbcData.dbTableSuffix)
					$(':input[name="dbTableFormat"]', this.elWizardDbDetails)
							.val(jdbcData.dbTableSuffix)
				}

			} else {
				$(':input[name="fileType"]', this.elWizardStorageType).select2(
						{
							data : this.options.storageTypes
						});
				$(':input[name="vendor"]', this.elWizardStorageType).select2(
						{
							data : this.options.vendorItem
						});
				
				$(':input[name="fileDateFormat"]', this.elWizardFileDetails)
						.select2({
							createSearchChoice : this._customSelect2OptsCreator,
							data : this.options.fileDateFormats
						});
			}
			$(':input[name="dbProvider"]', this.elWizardDbDetails).select2({
						data : this.options.dbTypes
					});
			$(':input[name="dbSwipeTable"]', this.elWizardDbDetails).select2({
						createSearchChoice : this._customSelect2OptsCreator,
						data : this.options.dbTableList

					});

			$(':input[name="example-file"]', this.elWizardFileDetails).on(
					'change', this.proxy('_onExapleFileChange'));
			$(':input[name="dbProvider"]', this.elWizardDbDetails).on('change',
					this.proxy('_onDbTypeChange'));
			$('span.test-connection', this.elWizardDbDetails).on('click',
					this.proxy('_doTestConnection'))
			$('span.fetchTableBtn', this.elWizardDbDetails).on('click',
					this.proxy('_onFetchTableDetails'))

			this.el.on('click', 'span.field-settings .btn', this
							.proxy('_onFieldSettingsClick'));

			this._setActiveTab(this.elWizardStorageType);

			this.config = {};
			if (this.options.config) {
				this.config = this.options.config
			}
		},

		_onWizardPrevClick : function() {
			var currentPanel = this.getActivePanel();

			if (currentPanel.is(this.elWizardFileDetails)) {
				this._setActiveTab(this.elWizardStorageType);
			} else if (currentPanel.is(this.elWizardDbDetails)) {
				this._setActiveTab(this.elWizardStorageType);
			} else if (currentPanel.is(this.elWizardFileDetails)) {
				this._setActiveTab(this.elWizardStorageType);
			} else if (currentPanel.is(this.elWizardFieldMappingCSV)) {
				if (this.config.fileType == 'csv') {
					this._setActiveTab(this.elWizardFileDetails);
				} else {
					this._setActiveTab(this.elWizardDbDetails);
				}
			}
		},

		_onWizardNextClick : function() {
			var currentPanel = this.getActivePanel();
			var form = $('form', currentPanel);
			if (form.length == 1 && form.data('validator') && !form.valid()) {
				return;
			}

			var configKeys = currentPanel.data('configkeys');
			if (configKeys) {
				if(configKeys.indexOf('dbIsDynamicTable') > 0){
					this.config['dbIsDynamicTable'] =$(':input[name="dbIsDynamicTable"]', form).is(':checked');
					configKeys = configKeys.replace('dbIsDynamicTable','');
				}
				configKeys = configKeys.split(',');
				$.each(configKeys, $.proxy(function(i, v) {
									var key = v.trim();
									this.config[key] = $(
											':input[name="' + key + '"]', form)
											.val();
								}, this));
			}

			if (currentPanel.is(this.elWizardStorageType)) {
				this._onStorageTypeNext();
			} else if (currentPanel.is(this.elWizardFileDetails)) {
				this._onFileDetailsNext();
			} else if (currentPanel.is(this.elWizardDbDetails)) {
				this._onDbDetailsNext()
			}
		},

		_onWizardCancelClick : function() {
			window.location = GtsUtils.getContextPath() + '/home';
		},

		_onWizardFinishClick : function() {

			if (this._setupInProgress) {
				return;
			}

			var currentPanel = this.getActivePanel();
			var form = $('form', currentPanel);
			var mapping = [];
			if (form.length == 1 && form.data('validator') && !form.valid()) {
				return;
			}
			var errorlog = {};
			var valid = true;
			var dateTimeExists = false;
			var isEmployeePresent = false;
			var isDateValid = false;
			var isTimeValid = false;

			var selectedField = $(':input.column-field', form);
			var _self = this;
			selectedField.each(function(i, v) {
				var val = $(v).val();

				if (val == 'datetime') {
					dateTimeExists = true;
				} else if (val == 'date') {
					isDateValid = true;
				} else if (val == 'time') {
					isTimeValid = true;
				} else if (val == 'employeeno') {
					isEmployeePresent = true;
				}

				for (var j = 0; j < i; j++) {
					if (selectedField.eq(j).val() == val && val != 'ignore') {
						var element = selectedField.eq(j);
						valid = false;
						errorlog[$(v).attr('name')] = 'Duplicate entires are not allowed';
						return;
					}
				}
				if (_self.config.fileType != 'jdbc'
						&& (val == 'date' || val == 'datetime' || val == 'time')) {
					if ($(v).data('config') === undefined
							|| $(v).data('config') === '') {
						valid = false;
						errorlog[$(v).attr('name')] = 'Please select the proper format';
						return;
					}
				}
				if (val == 'inout') {
					if ($(v).data('config') === undefined
							|| $(v).data('config') === '') {
						valid = false;
						errorlog[$(v).attr('name')] = 'Please select the proper IN and OUT indicator';
						return;
					}
				}

				var obj = {};
				obj['source'] = $(v).data('fieldsource');
				obj['destination'] = val;
				if (_self.config.fileType != 'jdbc'
						&& (val == 'date' || val == 'datetime' || val == 'time')) {
					obj['format'] = JSON.parse($(v).data().config).format;
				} else if (val == 'inout') {
					obj['inoutFormat'] = JSON.parse($(v).data().config);
				}
				mapping.push(obj);

			})

			if (!isEmployeePresent) {
				GtsUtils
						.errorMsg('Please select the employee field, it is the value uploaded to the Access Card Details.');
				valid = false;
			} else if (dateTimeExists) {
				if (isDateValid || isTimeValid) {
					selectedField.each(function(i, v) {
						var val = $(v).val();
						if (val == 'date' || val == 'time') {
							errorlog[$(v).attr('name')] = 'Please select other than Date or Time since Date Time is already present';
						}
					});
					valid = false;
				}
			} else if (!dateTimeExists) {
				if (!isDateValid || !isTimeValid) {
					GtsUtils
							.errorMsg('Please select either Date Time or both Date and Time.');
					valid = false;
				}
			}

			
			this.config.mapping = mapping;
			if (!valid) {
				form.data('validator').showErrors(errorlog);
			} else {

				this.btnFinish.attr('disabled', 'disabled');
				this._setupInProgress = true;
				$.ajax({
					url : GtsUtils.getContextPath()
							+ '/loader/setup/csv/csvmappingdata',
					data : {
						fileType : this.config.fileType,
						vendor : this.config.vendor,
						notes : this.config.notes,
						inputFileFormat : this.config.fileDateFormat,
						inputFileExtension : this.config.fileExtension,
						exampleFile : this.config.examplefile,
						mappingJson : JSON.stringify(this.config)
					},
					type : 'POST',
					msgprocessing : {
						hideMessage : true
					}
				}).always($.proxy(function() {
							this.btnFinish.removeAttr('disabled');
							this._setupInProgress = false;
						}, this));

			}
		},

		_onExapleFileChange : function() {
			var fileName = $(':input[name="examplefile"]',
					this.elWizardFileDetails);
			$(':input[name="fileExtension"]', this.elWizardDbDetails)
					.val(fileName.val().split('.').pop());
		},
		_onDbTypeChange : function() {
			var dbName = $(':input[name="dbProvider"]', this.elWizardDbDetails)
					.val();
			if (dbName == 'msaccess') {
				$('input.notMsaccess', this.elWizardDbDetails).attr('disabled',
						true);
				$(':input[name="dbPort"]', this.elWizardDbDetails).val('');
				$('input.msAccess', this.elWizardDbDetails).attr('disabled',
						false);
			} else {
				$('input.msAccess', this.elWizardDbDetails).attr('disabled',
						true);
				$('input.notMsaccess', this.elWizardDbDetails).attr('disabled',
						false);
				$(':input[name="dbPort"]', this.elWizardDbDetails)
						.val(this.options.dbPorts[dbName].port);
			}

		},

		_onFieldSettingsClick : function(e) {
			var $target = $(e.currentTarget);
			var currentPanel = this.getActivePanel();

			var $field = $target.parent().siblings('.column-field:input');
			var value = $field.val();
			if (value == 'date' || value == 'datetime' || value == 'time') {
				this._showDateFieldFormatter($field);
			} else if (value == 'inout') {
				this._showDateInOutFormatter($field);
			}
		},

		getActivePanel : function() {
			return $('.wizard-panel.active', this.el);
		},

		_setVisibility : function(el, visibility) {
			if (visibility) {
				el.show();
			} else {
				el.hide();
			}
		},

		_setActiveTab : function(panel) {
			this.getActivePanel().removeClass('active').hide();
			panel.addClass('active').show();
			var btns = panel.data('btns');
			this.btnWizardActions.hide();
			if (btns) {
				btns = btns.split(',');
				$.each(btns, $.proxy(function(i, v) {
							this.btnWizardActions.filter('.wizard-' + v).show();
						}, this));
			}
		},

		_customSelect2OptsCreator : function(term, data) {
			if ($(data).filter(function() {
						return this.text.localeCompare(term) === 0;
					}).length === 0) {
				return {
					id : term,
					text : term
				};
			}
		},

		_onStorageTypeNext : function() {
			if (this.config.fileType == 'csv') {
				this._setActiveTab(this.elWizardFileDetails);
				if (this.options.config) {
					$('input[name="fileExtension"]')
							.val(this.options.config.fileExtension)
					$('textarea[name="notes"]')
							.val(this.options.config.notes)
					$(':input[name="fileDateFormat"]', this.elWizardFileDetails)
							.select2({
								createSearchChoice : this._customSelect2OptsCreator,
								data : this.options.fileDateFormats,
								initSelection : $.proxy(function(element,
										callback) {
									var fileDateFormats = this.options.fileDateFormats;
									var obj;
									for (var i = 0; i < fileDateFormats.length; i++) {
										if (fileDateFormats[i].id == this.options.config.fileDateFormat) {
											obj = {
												id : fileDateFormats[i].id,
												text : fileDateFormats[i].text
											};
										}

									}

									if (!obj) {
										obj = {
											id : this.options.config.fileDateFormat,
											text : this.options.config.fileDateFormat
										};
									}
									callback(obj);

								}, this)
							}).select2('val',
									this.options.config.fileDateFormat);
				}

			} else if (this.config.fileType == 'jdbc') {
				$(':input[name="dbProvider"]', this.elWizardDbDetails).select2(
						{
							data : this.options.dbTypes,
							initSelection : $.proxy(
									function(element, callback) {
										var dbTypes = this.options.dbTypes;
										for (var i = 0; i < dbTypes.length; i++) {
											if (dbTypes[i].id == this.options.config.dbProvider) {
												callback({
															id : dbTypes[i].id,
															text : dbTypes[i].text
														});
											}

										}

									}, this)
						});
				$(':input[name="dbProvider"]', this.elWizardDbDetails).select2(
						'val', this.options.config.dbProvider);
				$(':input[name="dbSwipeTable"]', this.elWizardDbDetails)
						.select2({
							createSearchChoice : this._customSelect2OptsCreator,
							data : this.options.dbTableList,
							initSelection : $.proxy(
									function(element, callback) {

										callback({
											id : this.options.config.dbSwipeTable,
											text : this.options.config.dbSwipeTable

										});

									}, this)

						});
				$(':input[name="dbSwipeTable"]', this.elWizardDbDetails)
						.select2('val', this.options.config.dbSwipeTable);
				
				$(':input[name="dbTablePrefix"]', this.elWizardDbDetails)
				.val( this.config.dbTablePrefix);
				
				$(':input[name="dbTableFormat"]', this.elWizardDbDetails)
				.val( this.config.dbTableFormat);
				
				$(':input[name="dbTableSuffix"]', this.elWizardDbDetails)
				.val( this.config.dbTableSuffix);
				
				this._setActiveTab(this.elWizardDbDetails);
				if(!this.config.dbIsDynamicTable){
					 $('#dynamicTable').hide();
				}else{
					$('#swipeTable').hide();
				}
			} else {
				return false;
			}
		},
		_onFileDetailsNext : function() {
			var form = $('form', this.elWizardFileDetails);
			if (!this.options.config.mapping
					|| $("input[name='examplefile']").val() != '') {
				form.ajaxSubmit({
							url : GtsUtils.getContextPath()
									+ '/loader/setup/csv/file',
							dataType : 'json',
							type : 'POST',
							data : GtsUtils.getAjaxifiedFrameData({}),
							validator : {
								form : form
							},
							msgprocessing : {
								hideMessage : true
							},
							success : this.proxy('_processFileDetailsNextAjax'),
							error : function(xhr, status, error) {
								GtsUtils.processAjaxFrameError(xhr, {});
							}
						});
			} else {
				var cols = [];
				$.each(this.options.config.mapping, $.proxy(function(i, v) {
									var obj = {};
									obj['source'] = i
									obj['text'] = i + 1
									cols.push(obj)
								}, this));
				this._createCVSMapppingControlls(cols);
				this._setActiveTab(this.elWizardFieldMappingCSV)
			}
		},
		_createCVSMapppingControlls : function(cols) {
			var elInner = $('.col-fields', this.elWizardFieldMappingCSV)
					.empty();
			var data = {
				columns : []
			}

			var rules = {};
			$.each(cols, $.proxy(function(i, v) {
								data.columns.push({
											index : i,
											column : cols[i].text,
											source : cols[i].source
										});

								rules['field-' + i] = {
									required : true
								};
							}, this));

			this.elWizardFieldMappingCSV
					.html($.render[this.options.tmpl.csvFieldMapping](data, {
								tmplField : this.options.tmpl.csvFieldMappingField
							}));

			var form = $('form', this.elWizardFieldMappingCSV);
			form.validate({
						rules : rules
					});

			$('.column-field', form).data('gtsFnErrorPlacement',
					this._getFnErrorPlacement()).select2({
						data : this.options.mappingFields,
						matcher1 : function(term, text, opt) {
							var fields = form.data('selectedFields');
							return !fields;
						}
					});

			$(form).on('change', '.column-field:input',
					$.proxy(this._onFieldMappingSelect, this));
			this._setActiveTab(this.elWizardFieldMappingCSV);
			if (this.options.config.mapping) {
				var mappings = this.options.config.mapping;
				for (var j = 0; j < mappings.length; j++) {
					var mapping = mappings[j];
					var fieldName = ":input[name='field-" + j + "']";
					$(fieldName, this.elWizardFieldMappingCSV).select2({
						data : this.options.mappingFields,
						initSelection : $.proxy(function(element, callback) {
							var mappingFields = this.options.mappingFields;
							for (var i = 0; i < mappingFields.length; i++) {
								if (mappingFields[i].id == mapping.destination) {
									callback({
												id : mappingFields[i].id,
												text : mappingFields[i].text
											});
									var mappingFieldConfig = this.options.mappingFieldConfigs[mapping.destination];

									if (mappingFieldConfig
											&& mappingFieldConfig.settings
											&& (this.config.fileType == 'csv' || mapping.destination == 'inout')) {
										$(fieldName,
												this.elWizardFieldMappingCSV)
												.siblings('.field-settings')
												.show();
									} else {
										$(fieldName,
												this.elWizardFieldMappingCSV)
												.siblings('.field-settings')
												.hide();
									}
								}

							}

						}, this)

					}).select2('val', mapping.destination);

					if (mapping.destination == 'datetime'
							|| mapping.destination == 'date'
							|| mapping.destination == 'time') {
						$(fieldName, this.elWizardFieldMappingCSV).data(
								'config', JSON.stringify({
											format : mapping.format
										}));
					} else if (mapping.destination == 'inout') {
						var config = [];
						for (var i = 0; i < mapping.inoutFormat.length; i++) {
							var obj = {}
							if (mapping.inoutFormat[i].value == 1) {
								obj['key'] = mapping.inoutFormat[i].key, obj['value'] = 1
								config.push(obj);
							} else {
								obj['key'] = mapping.inoutFormat[i].key, obj['value'] = 0
								config.push(obj);
							}
						}
						$(fieldName, this.elWizardFieldMappingCSV).data(
								'config', JSON.stringify(config));
					}
				}
			}

		},

		_processFileDetailsNextAjax : function(result, status, xhr, $form) {
			GtsUtils.processAjaxFrameSuccess(result, status, xhr, $form);

			if (result._success == true) {

				if (result.line) {
					var col = [];
					for (var i = 0; i < result.cols.length; i++) {
						var obj = {};
						obj['source'] = i
						obj['text'] = result.cols[i]
						col.push(obj)
					}
					this._createCVSMapppingControlls(col)
				}

				this._setActiveTab(this.elWizardFieldMappingCSV);
			}
		},
		_getFnErrorPlacement : function() {
			var self = this;
			return function(error, element) {

				var $el = $(element);
				var $parent = $el.parent();
				var $error = $(error)
						.addClass($el.attr('error-placement') == 'inline'
								? 'help-inline'
								: 'help-block');

				$error.insertAfter($el.next());
			};
		},

		_onFieldMappingSelect : function(e) {
			var fields = [];
			var form = $('form', this.elWizardFieldMappingCSV);
			$('.column-field:input', form).each(function(i, v) {
						var val = $(v).val();
						if (val) {
							fields.push(val);
						}
					});
			form.data('selectedFields', fields);

			var $target = $(e.target)
			var value = $target.val();

			var mappingFieldConfig = this.options.mappingFieldConfigs[value];

			if (mappingFieldConfig && mappingFieldConfig.settings
					&& (this.config.fileType == 'csv' || value == 'inout')) {
				$target.siblings('.field-settings').show();
			} else {
				$target.siblings('.field-settings').hide();
			}
		},

		_showDateFieldFormatter : function($field) {
			var fieldType = $field.val();
			var html = $.render[this.options.tmpl.fieldFormatDt]({});
			var el = $(html).appendTo(this.el);

			var formats = this.options.mappingFieldConfigs[fieldType].formats;

			var strConfig = $field.data('config');
			var jsonConfig;
			if (strConfig) {
				jsonConfig = strConfig;
			} else {
				var mapping = this.options.config.mapping;
				if (mapping) {
					for (i = 0; i < mapping.length; i++) {
						if (mapping[i].destination == fieldType) {
							jsonConfig = '{"format":"' + mapping[i].format
									+ '"}';
						}
					}
				}
			}

			var formatCreated = false;
			if (jsonConfig) {
				jsonConfig = JSON.parse(jsonConfig);
				if (jsonConfig.format) {
					$(':input[name="format"]', el).select2({
								createSearchChoice : this._customSelect2OptsCreator,
								initSelection : function(element, callback) {
									callback({
												id : jsonConfig.format,
												text : jsonConfig.format
											});
								},
								data : formats
							});

					$(':input[name="format"]', el).select2('val',
							jsonConfig.format).trigger('change');;
					formatCreated = true;
				}
			}

			if (!formatCreated) {
				$(':input[name="format"]', el).select2({
							createSearchChoice : this._customSelect2OptsCreator,
							data : formats
						});

			}

			var $form = $('form', el);
			$form.validate({
						rules : {
							format : {
								required : this.config.fileType == 'csv'
										? true
										: false
							}
						}
					});

			$('.save-format', el).on('click', $.proxy(function() {
								if (!$form.valid()) {
									return;
								}

								var config = {
									format : $(':input[name="format"]', $form)
											.val()
								}
								$field.data('config', JSON.stringify(config));

								el.modal('hide');
								el.remove();
							}));

			el.modal({
						keyboard : false
					});
		},
		_showDateInOutFormatter : function($field) {
			var fieldType = $field.val();
			var formatCreated = false;
			var html = $.render[this.options.tmpl.inOutFormatDt]({});
			var el = $(html).appendTo(this.el);
			var formats = this.options.mappingFieldConfigs[fieldType].formats;

			var strConfig = $field.data('config');
			var jsonConfig;
			var outformat;
			if (strConfig) {
				jsonConfig = strConfig;
			} else {
				var mapping = this.options.config.mapping;
				if (mapping) {
					for (i = 0; i < mapping.length; i++) {
						if (mapping[i].destination == fieldType) {
							jsonConfig = '{"format":"' + mapping[i].informat
									+ '"}';
							outformat = '{"format":"' + mapping[i].outformat
									+ '"}';
						}
					}
				}
			}

			if (jsonConfig) {
				jsonConfig = JSON.parse(jsonConfig);
				if (jsonConfig) {
					var inValue = '';
					var outValue = '';
					for (var i = 0; i < jsonConfig.length; i++) {
						if (jsonConfig[i].value == 1) {
							inValue += jsonConfig[i].key + ',';
						} else {
							outValue += jsonConfig[i].key + ',';
						}
					}
					inValue = inValue.substring(0, inValue.length - 1);
					outValue = outValue.substring(0, outValue.length - 1);
					$(':input[name="inFormat"]', el).select2({
								createSearchChoice : this._customSelect2OptsCreator,
								initSelection : function(element, callback) {
									callback({
												id : inValue,
												text : inValue
											});
								},
								data : formats
							});

					$(':input[name="inFormat"]', el).select2('val', inValue)
							.trigger('change');
					formatCreated = true;

					$(':input[name="outFormat"]', el).select2({
								createSearchChoice : this._customSelect2OptsCreator,
								initSelection : function(element, callback) {
									callback({
												id : outValue,
												text : outValue
											});
								},
								data : formats
							});

					$(':input[name="outFormat"]', el).select2('val', outValue)
							.trigger('change');
					formatCreated = true;

				}
			}
			var formatCreated = false;
			var formats = this.options.mappingFieldConfigs[fieldType].formats;
			if (!formatCreated) {
				$(':input[name="inFormat"]', el).select2({
							createSearchChoice : this._customSelect2OptsCreator,
							multiple : true,
							tags : formats
						});
				$(':input[name="outFormat"]', el).select2({
							createSearchChoice : this._customSelect2OptsCreator,
							multiple : true,
							tags : formats
						});

			}
			var $form = $('form', el);
			$form.validate({
						rules : {
							format : {
								required : true
							}
						}
					});

			$('.save-format', el).on('click', $.proxy(function() {
						if (!$form.valid()) {
							return;
						}
						var config = [];
						var inArray = $(':input[name="inFormat"]', $form).val()
								.split(',');
						for (var i = 0; i < inArray.length; i++) {
							var obj = {};
							obj['key'] = inArray[i], obj['value'] = 1
							config.push(obj)
						}
						var outArray = $(':input[name="outFormat"]', $form)
								.val().split(',');
						for (var j = 0; j < outArray.length; j++) {
							var obj = {};
							obj['key'] = outArray[j], obj['value'] = 0
							config.push(obj)
						}
						$field.data('config', JSON.stringify(config));
						el.modal('hide');
						el.remove();
					}));

			el.modal({
						keyboard : false
					});
		},

		_onDbDetailsNext : function() {
			this.options.dbTableList.length = 0;
			var currentPanel = this.getActivePanel();
			var form = $('form', currentPanel);
			if (form.length == 1 && form.data('validator') && !form.valid()) {
				return;
			}
			$('span.wizard-btn').addClass('disabled');
			return $.ajax({
				url : GtsUtils.getContextPath()
						+ '/loader/setup/db/fecthcolumns',
				data : {
					dbProvider : $(':input[name="dbProvider"]', form).val(),
					dbUserName : $(':input[name="dbUserName"]', form).val(),
					dbPassword : $(':input[name="dbPassword"]', form).val(),
					dbHost : $(':input[name="dbHost"]', form).val(),
					dbName : $(':input[name="dbName"]', form).val(),
					fileLocation : $(':input[name="fileLocation"]', form).val(),
					dbSwipeTable : $(':input[name="dbSwipeTable"]', form).val(),
					dbSchemaName : $(':input[name="dbSchemaName"]', form).val(),
					dbPort : $(':input[name="dbPort"]', form).val(),
					dbIsDynamicTable : $(':input[name="dbIsDynamicTable"]', form).is(':checked'),
					dbTableSuffix : $(':input[name="dbTableSuffix"]', form).val(),
					dbTablePrefix : $(':input[name="dbTablePrefix"]', form).val(),
					dbTableFormat : $(':input[name="dbTableFormat"]', form).val()

				},
				type : 'POST',
				msgprocessing : {
					hideMessage : false
				}
			}).done($.proxy(function(data) {
						$('span.wizard-btn').removeClass('disabled');
						var cols = [];
						this.options.tableColumnList = data.tblColumnName;
						$.each(this.options.tableColumnList, $.proxy(function(
												i, v) {
											var obj = {};
											obj['source'] = v
											obj['text'] = v
											cols.push(obj)
										}, this));
						this._createCVSMapppingControlls(cols);
						this._setActiveTab(this.elWizardFieldMappingCSV)
					}, this));
		},

		_onFetchTableDetails : function(e) {
			this.options.dbTableList.length = 0;
			var currentPanel = this.getActivePanel();
			var form = $('form', currentPanel);
			if (form.length == 1 && form.data('validator') && !form.valid()) {
				return;
			}
			$('span.wizard-btn').addClass('disabled');
			$('span.test-connection').addClass('disabled');
			return $.ajax({
				url : GtsUtils.getContextPath()
						+ '/loader/setup/db/fecthtables',
				data : {
					dbProvider : $(':input[name="dbProvider"]', form).val(),
					dbUserName : $(':input[name="dbUserName"]', form).val(),
					dbPassword : $(':input[name="dbPassword"]', form).val(),
					dbHost : $(':input[name="dbHost"]', form).val(),
					dbName : $(':input[name="dbName"]', form).val(),
					fileLocation : $(':input[name="fileLocation"]', form).val(),
					dbSwipeTable : $(':input[name="dbSwipeTable"]', form).val(),
					dbSchemaName : $(':input[name="dbSchemaName"]', form).val(),
					dbPort : $(':input[name="dbPort"]', form).val(),
					dbIsDynamicTable : $(':input[name="dbIsDynamicTable"]', form).is(':checked'),
					dbTableSuffix : $(':input[name="dbTableSuffix"]', form).val(),
					dbTablePrefix : $(':input[name="dbTablePrefix"]', form).val(),
					dbTableFormat : $(':input[name="dbTableFormat"]', form).val()

				},
				type : 'POST',
				msgprocessing : {
					hideMessage : false
				}
			}).done($.proxy(function(data) {
						$('span.wizard-btn').removeClass('disabled');
						$('span.test-connection').removeClass('disabled');
						GtsUtils.successMsg('Table name fetched successfully!');
						this.options.tableColumnList = data.tblColumnName;
						for (var i = 0; i < data.tableList.length; i++) {
							this.options.dbTableList.push({
										id : data.tableList[i],
										text : data.tableList[i]
									})
						}
					}, this));
		},

		_doTestConnection : function(e) {
			this.options.dbTableList.length = 0;
			var currentPanel = this.getActivePanel();
			var form = $('form', currentPanel);
			if (form.length == 1 && form.data('validator') && !form.valid()) {
				return;
			}
			$('span.wizard-btn').addClass('disabled');
			$('span.fetchTableBtn').addClass('disabled');
			return $.ajax({
				url : GtsUtils.getContextPath()
						+ '/loader/setup/db/dbTestConnection',
				data : {
					dbProvider : $(':input[name="dbProvider"]', form).val(),
					dbUserName : $(':input[name="dbUserName"]', form).val(),
					dbPassword : $(':input[name="dbPassword"]', form).val(),
					dbHost : $(':input[name="dbHost"]', form).val(),
					dbName : $(':input[name="dbName"]', form).val(),
					fileLocation : $(':input[name="fileLocation"]', form).val(),
					dbSwipeTable : $(':input[name="dbSwipeTable"]', form).val(),
					dbSchemaName : $(':input[name="dbSchemaName"]', form).val(),
					dbPort : $(':input[name="dbPort"]', form).val(),
					dbIsDynamicTable : $(':input[name="dbIsDynamicTable"]', form).is(':checked'),
					dbTableSuffix : $(':input[name="dbTableSuffix"]', form).val(),
					dbTablePrefix : $(':input[name="dbTablePrefix"]', form).val(),
					dbTableFormat : $(':input[name="dbTableFormat"]', form).val()

				},
				type : 'POST',
				msgprocessing : {
					hideMessage : false
				}
			}).done(function(data) {
				$('span.wizard-btn').removeClass('disabled');
				$('span.fetchTableBtn').removeClass('disabled');
				GtsUtils.successMsg('Database settings verified successfully!');
			});

		},

		options : {
			storageTypes : [{
						id : 'csv',
						text : 'CSV'
					}, {
						id : 'jdbc',
						text : 'Database'
					}],
			dbTypes : [{
						id : 'postgresql',
						text : 'PostgreSQL'
					}, {
						id : 'mysql',
						text : 'My SQL'
					}, {
						id : 'sqlserver',
						text : 'SQL Server'
					}, {
						id : 'msaccess',
						text : 'MS Access'
					}, {
						id : 'oracle',
						text : 'Oracle'
					},{
						id : 'microsoftsqlserver',
						text : 'SQL Server With Microsoft Jdbc Driver'
					}],
			dbTableList : [],
			tableColumnList : [],
			dbPorts : {
				postgresql : {
					port : 5432
				},
				mysql : {
					port : 3306
				},
				sqlserver : {
					port : 1433
				},
				msaccess : {
					port : 1234
				},
				oracle : {
					port : 1521
				}
			},
			fileDateFormats : [{
						id : 'dd-MMM-yyyy',
						text : 'dd-MMM-yyyy'
					}, {
						id : 'dd MMM yyyy',
						text : 'dd MMM yyyy'
					}, {
						id : 'dd/MM/yyyy',
						text : 'dd/MM/yyyy'
					}, {
						id : 'm/d/yy',
						text : 'm/d/yy'// 6/9/07
					}, {
						id : 'mmm d, yyyy',
						text : 'mmm d, yyyy'// Jun 9, 2007
					}, {
						id : 'dddd, mmmm d, yyyy',
						text : 'dddd, mmmm d, yyyy'
						// Saturday, June 9, 2007
				}],
			mappingFields : [{
						id : 'ignore',
						text : 'Ignore'
					}, {
						id : 'date',
						text : 'Date'
					}, {
						id : 'datetime',
						text : 'Date Time'
					}, {
						id : 'doorname',
						text : 'Door Name'
					}, {
						id : 'employeeno',
						text : 'Employee'
					}, {
						id : 'employeename',
						text : 'Employee Name'
					}, {
						id : 'inout',
						text : 'In/Out Indicator'
					}, {
						id : 'serial',
						text : 'Serial Numner'
					}, {
						id : 'time',
						text : 'Time'
					}],
			mappingFieldConfigs : {
				date : {
					settings : true,
					formats : [{
								id : 'dd-MMM-yyyy',
								text : 'dd-MMM-yyyy'
							}, {
								id : 'dd MMM yyyy',
								text : 'dd MMM yyyy'
							}, {
								id : 'dd/MM/yyyy',
								text : 'dd/MM/yyyy'
							}, {
								id : 'm/d/yy',
								text : 'm/d/yy'// 6/9/07
							}, {
								id : 'mmm d, yyyy',
								text : 'mmm d, yyyy'// Jun 9, 2007
							}, {
								id : 'dddd, mmmm d, yyyy',
								text : 'dddd, mmmm d, yyyy'
								// Saturday, June 9, 2007
						}]
				},
				datetime : {
					settings : true,
					formats : [{
								id : 'dd-MMMM-yyyy HH:mm:ss Z',
								text : 'dd-MMMM-yyyy HH:mm:ss Z'
							}, {
								id : 'yyyy-mm-dd HH:MM:ss',
								text : 'yyyy-mm-dd HH:MM:ss'
								// 2007-06-09 17:46:21
						}	, {
								id : 'ddd mmm dd yyyy HH:MM:ss',
								text : 'ddd mmm dd yyyy HH:MM:ss'
								// Sat Jun 09 2007 17:46:21
						}]
				},
				time : {
					settings : true,
					formats : [{
								id : 'HH:mm:ss Z',
								text : 'HH:mm:ss Z'
							}, {
								id : 'h:MM TT',
								text : 'h:MM TT'// 5:46 PM
							}, {
								id : 'h:MM:ss TT',
								text : 'h:MM:ss TT'// 5:46:21 PM
							}, {
								id : 'h:MM:ss TT Z',
								text : 'h:MM:ss TT Z'// 5:46:21 PM EST
							}, {
								id : 'HH:MM:ss',
								text : 'HH:MM:ss'// 17:46:21
							}]
				},
				inout : {
					settings : true,
					formats : [{
								id : 1,
								text : '1'
							}, {
								id : 0,
								text : '0'
							}]
				}
			},
			tmpl : {
				csvFieldMapping : 'setup-loader-csv-field-mapping',
				csvFieldMappingField : 'setup-loader-csv-field-mapping-field',
				fieldFormatDt : 'setup-loader-field-format-settings-dt',
				inOutFormatDt : 'setup-loader-field-inout-settings'

			}
		}
	});
	$('#dbIsDynamicTable').change(function() {
		$('#dynamicTable').toggle(this.checked);
		$('#swipeTable').toggle(!this.checked);
		if (this.checked) {
			$('#dbTablePrefix, #dbTableFormat').removeAttr('disabled');
		} else {
			$('#dbTablePrefix, #dbTableFormat').prop('disabled', true);
		}
});
});