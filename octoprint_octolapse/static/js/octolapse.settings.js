/*
    This file is subject to the terms and conditions defined in
    a file called 'LICENSE', which is part of this source code package.
*/
$(function () {

    
    // Settings View Model
    Octolapse.SettingsViewModel = function (parameters) {
        // Create a reference to this object
        var self = this;
        // Add this object to our Octolapse namespace
        Octolapse.Settings = this;
        // Create an empty add/edit profile so that the initial binding to the empty template works without errors.
        Octolapse.Settings.AddEditProfile = ko.observable({ "templateName": "empty-template", "profileObservable": ko.observable() });
        // Assign the Octoprint settings to our namespace
        Octolapse.Settings.global_settings = parameters[0];
        self.loginState = parameters[1];



        // Called before octoprint binds the viewmodel to the plugin
        self.onAfterBinding = function () {

            /*
                Create our global settings
            */
            self.settings = self.global_settings.settings.plugins.octolapse;
            settings = ko.toJS(self.settings); // just get the values

            /**
             * Profiles - These are bound by octolapse.profiles.js
             */
            /*
                Create our printers view model
            */
            var printerSettings =
                {
                    'current_profile_guid': settings.current_printer_profile_guid
                    , 'profiles': settings.printers
                    , 'default_profile': settings.default_printer_profile
                    , 'profileOptions': {
                        'e_axis_default_mode_options': settings.e_axis_default_mode_options,
                        'g90_influences_extruder_options': settings.g90_influences_extruder_options,
                        'xyz_axes_default_mode_options': settings.xyz_axes_default_mode_options,
                    }
                    , 'profileViewModelCreateFunction': Octolapse.PrinterProfileViewModel
                    , 'profileValidationRules': Octolapse.PrinterProfileValidationRules
                    , 'bindingElementId': 'octolapse_printer_tab'
                    , 'addEditTemplateName': 'printer-template'
                    , 'profileTypeName': 'Printer'
                    , 'addUpdatePath': 'addUpdateProfile'
                    , 'removeProfilePath': 'removeProfile'
                    , 'setCurrentProfilePath': 'setCurrentProfile'
                };
            Octolapse.Printers = new Octolapse.ProfilesViewModel(printerSettings);
            /*
                Create our stabilizations view model
            */
            var stabilizationSettings =
                {
                    'current_profile_guid': settings.current_stabilization_profile_guid
                    , 'profiles': settings.stabilizations
                    , 'default_profile': settings.default_stabilization_profile
                    , 'profileOptions': { 'stabilization_type_options': settings.stabilization_type_options }
                    , 'profileViewModelCreateFunction': Octolapse.StabilizationProfileViewModel
                    , 'profileValidationRules': Octolapse.StabilizationProfileValidationRules
                    , 'bindingElementId': 'octolapse_stabilization_tab'
                    , 'addEditTemplateName': 'stabilization-template'
                    , 'profileTypeName': 'Stabilization'
                    , 'addUpdatePath': 'addUpdateProfile'
                    , 'removeProfilePath': 'removeProfile'
                    , 'setCurrentProfilePath': 'setCurrentProfile'
                };
            Octolapse.Stabilizations = new Octolapse.ProfilesViewModel(stabilizationSettings);
            /*
                Create our snapshots view model
            */
            var snapshotSettings =
                {
                    'current_profile_guid': settings.current_snapshot_profile_guid
                    , 'profiles': settings.snapshots
                    , 'default_profile': settings.default_snapshot_profile
                    , 'profileOptions': { 'snapshot_extruder_trigger_options': settings.snapshot_extruder_trigger_options, 'position_restriction_shapes': settings.position_restriction_shapes, 'position_restriction_types': settings.position_restriction_types }
                    , 'profileViewModelCreateFunction': Octolapse.SnapshotProfileViewModel
                    , 'profileValidationRules': Octolapse.SnapshotProfileValidationRules
                    , 'bindingElementId': 'octolapse_snapshot_tab'
                    , 'addEditTemplateName': 'snapshot-template'
                    , 'profileTypeName': 'Snapshot'
                    , 'addUpdatePath': 'addUpdateProfile'
                    , 'removeProfilePath': 'removeProfile'
                    , 'setCurrentProfilePath': 'setCurrentProfile'
                };
            Octolapse.Snapshots = new Octolapse.ProfilesViewModel(snapshotSettings);
            /*
                Create our rendering view model
            */
            var renderingSettings =
                {


                    'current_profile_guid': settings.current_rendering_profile_guid
                    , 'profiles': settings.renderings
                    , 'default_profile': settings.default_rendering_profile
                    , 'profileOptions': {
                        'rendering_fps_calculation_options': settings.rendering_fps_calculation_options
                        , 'rendering_output_format_options': settings.rendering_output_format_options
                    }
                    , 'profileViewModelCreateFunction': Octolapse.RenderingProfileViewModel
                    , 'profileValidationRules': Octolapse.RenderingProfileValidationRules
                    , 'bindingElementId': 'octolapse_rendering_tab'
                    , 'addEditTemplateName': 'rendering-template'
                    , 'profileTypeName': 'Rendering'
                    , 'addUpdatePath': 'addUpdateProfile'
                    , 'removeProfilePath': 'removeProfile'
                    , 'setCurrentProfilePath': 'setCurrentProfile'
                };
            Octolapse.Renderings = new Octolapse.ProfilesViewModel(renderingSettings);
            /*
                Create our camera view model
            */
            var cameraSettings =
                {
                    'current_profile_guid': settings.current_camera_profile_guid
                    , 'profiles': settings.cameras
                    , 'default_profile': settings.default_camera_profile
                    , 'profileOptions': {
                        'camera_powerline_frequency_options': settings.camera_powerline_frequency_options
                        , 'camera_exposure_type_options': settings.camera_exposure_type_options
                        , 'camera_led_1_mode_options': settings.camera_led_1_mode_options
                    }
                    , 'profileViewModelCreateFunction': Octolapse.CameraProfileViewModel
                    , 'profileValidationRules': Octolapse.CameraProfileValidationRules
                    , 'bindingElementId': 'octolapse_camera_tab'
                    , 'addEditTemplateName': 'camera-template'
                    , 'profileTypeName': 'Camera'
                    , 'addUpdatePath': 'addUpdateProfile'
                    , 'removeProfilePath': 'removeProfile'
                    , 'setCurrentProfilePath': 'setCurrentProfile'
                };
            Octolapse.Cameras = new Octolapse.ProfilesViewModel(cameraSettings);
            /*
                Create our debug view model
            */
            var debugSettings =
                {
                    'current_profile_guid': settings.current_debug_profile_guid
                    , 'profiles': settings.debug_profiles
                    , 'default_profile': settings.default_debug_profile
                    , 'profileOptions': { 'debug_profile_options': settings.debug_profile_options }
                    , 'profileViewModelCreateFunction': Octolapse.DebugProfileViewModel
                    , 'profileValidationRules': Octolapse.DebugProfileValidationRules
                    , 'bindingElementId': 'octolapse_debug_tab'
                    , 'addEditTemplateName': 'debug-template'
                    , 'profileTypeName': 'Debug'
                    , 'addUpdatePath': 'addUpdateProfile'
                    , 'removeProfilePath': 'removeProfile'
                    , 'setCurrentProfilePath': 'setCurrentProfile'
                };
            Octolapse.DebugProfiles = new Octolapse.ProfilesViewModel(debugSettings);

        };

        // Update all octolapse settings
        self.updateSettings = function (settings) {
            // SettingsMain
            Octolapse.SettingsMain.update(settings);
            // Printers
            Octolapse.Printers.profiles([]);
            Octolapse.Printers.current_profile_guid(settings.current_printer_profile_guid);
            settings.printers.forEach(function (item, index) {
                Octolapse.Printers.profiles.push(new Octolapse.PrinterProfileViewModel(item));
            });
            // Stabilizations
            Octolapse.Stabilizations.profiles([]);
            Octolapse.Stabilizations.current_profile_guid(settings.current_stabilization_profile_guid);
            settings.stabilizations.forEach(function (item, index) {
                Octolapse.Stabilizations.profiles.push(new Octolapse.StabilizationProfileViewModel(item));
            });
            // Snapshots
            Octolapse.Snapshots.profiles([]);
            Octolapse.Snapshots.current_profile_guid(settings.current_snapshot_profile_guid);
            settings.snapshots.forEach(function (item, index) {
                Octolapse.Snapshots.profiles.push(new Octolapse.SnapshotProfileViewModel(item));
            });
            // Renderings
            Octolapse.Renderings.profiles([]);
            Octolapse.Renderings.current_profile_guid(settings.current_rendering_profile_guid);
            settings.renderings.forEach(function (item, index) {
                Octolapse.Renderings.profiles.push(new Octolapse.RenderingProfileViewModel(item));
            });
            // Cameras
            Octolapse.Cameras.profiles([]);
            Octolapse.Cameras.current_profile_guid(settings.current_camera_profile_guid);
            settings.cameras.forEach(function (item, index) {
                Octolapse.Cameras.profiles.push(new Octolapse.CameraProfileViewModel(item));
            });
            // Debugs
            Octolapse.DebugProfiles.profiles([]);
            Octolapse.DebugProfiles.current_profile_guid(settings.current_debug_profile_guid);
            settings.debug_profiles.forEach(function (item, index) {
                Octolapse.DebugProfiles.profiles.push(new Octolapse.DebugProfileViewModel(item));
            });

        };

        /*
            reload the default settings
        */
        self.restoreDefaultSettings = function () {
            if (confirm("You will lose ALL of your octolapse settings by restoring the defaults!  Are you SURE?")) {
                // If no guid is supplied, this is a new profile.  We will need to know that later when we push/update our observable array
                var data = { "client_id": Octolapse.Globals.client_id };
                $.ajax({
                    url: "/plugin/octolapse/restoreDefaults",
                    type: "POST",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (newSettings) {

                        self.updateSettings(newSettings);
                        Octolapse.Globals.update(newSettings);
                        alert("The default settings have been restored.  You must reboot octoprint before the settings take effect.");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("Unable to restore the default settings.  Status: " + textStatus + ".  Error: " + errorThrown);
                    }
                });
            }
        };
        /*
            load all settings default settings
        */
        self.loadSettings = function () {

            // If no guid is supplied, this is a new profile.  We will need to know that later when we push/update our observable array
            $.ajax({
                url: "/plugin/octolapse/loadSettings",
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                success: function (newSettings) {
                    self.updateSettings(newSettings);
                    //console.log("Settings have been loaded.");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Unable to restore the default settings.  Status: " + textStatus + ".  Error: " + errorThrown);
                }
            });

        };
        /*
            Profile Add/Update routine for showAddEditDialog
        */
        self.addUpdateProfile = function (profile) {
            switch (profile.templateName) {
                case "printer-template":
                    Octolapse.Printers.addUpdateProfile(profile.profileObservable, self.hideAddEditDialog());
                    break;
                case "stabilization-template":
                    Octolapse.Stabilizations.addUpdateProfile(profile.profileObservable, self.hideAddEditDialog());
                    break;
                case "snapshot-template":
                    Octolapse.Snapshots.addUpdateProfile(profile.profileObservable, self.hideAddEditDialog());
                    break;
                case "rendering-template":
                    Octolapse.Renderings.addUpdateProfile(profile.profileObservable, self.hideAddEditDialog());
                    break;
                case "camera-template":
                    Octolapse.Cameras.addUpdateProfile(profile.profileObservable, self.hideAddEditDialog());
                    break;
                case "debug-template":
                    Octolapse.DebugProfiles.addUpdateProfile(profile.profileObservable, self.hideAddEditDialog());
                    break;
                default:
                    alert("Cannot save the object, the template (" + profile.templateName + ") is unknown!");
                    break;
            }

        };

        /*
            Modal Dialog Functions
        */
        // hide the modal dialog
        self.hideAddEditDialog = function (sender, event) {
            $("#octolapse_add_edit_profile_dialog").modal("hide");
        };
        // show the modal dialog
        self.showAddEditDialog = function (options, sender) {
            // Create all the variables we want to store for callbacks
            dialog = this;
            dialog.sender = sender;
            dialog.profileObservable = options.profileObservable;
            dialog.templateName = options.templateName;
            dialog.$addEditDialog = $("#octolapse_add_edit_profile_dialog");
            dialog.$addEditForm = dialog.$addEditDialog.find("#octolapse_add_edit_profile_form");
            dialog.$cancelButton = $("a.cancel", dialog.$addEditDialog);
            dialog.$saveButton = $("a.save", dialog.$addEditDialog);
            dialog.$defaultButton = $("a.set-defaults", dialog.$addEditDialog);
            dialog.$dialogTitle = $("h3.modal-title", dialog.$addEditDialog);
            dialog.$summary = dialog.$addEditForm.find("#add_edit_validation_summary");
            dialog.$errorCount = dialog.$summary.find(".error-count");
            dialog.$errorList = dialog.$summary.find("ul.error-list");
            dialog.$modalBody = dialog.$addEditDialog.find(".modal-body");

            // Create all of the validation rules
            rules = {
                rules: options.validationRules.rules,
                messages: options.validationRules.messages,
                ignore: ".ignore_hidden_errors:hidden",
                errorPlacement: function (error, element) {
                    var $field_error = $(element).parent().parent().find(".error_label_container");
                    $field_error.html(error);
                    $field_error.removeClass("checked");

                },
                highlight: function (element, errorClass) {
                    //$(element).parent().parent().addClass(errorClass);
                    var $field_error = $(element).parent().parent().find(".error_label_container");
                    $field_error.removeClass("checked");
                    $field_error.addClass(errorClass);
                },
                unhighlight: function (element, errorClass) {
                    //$(element).parent().parent().removeClass(errorClass);
                    var $field_error = $(element).parent().parent().find(".error_label_container");
                    $field_error.addClass("checked");
                    $field_error.removeClass(errorClass);
                },
                invalidHandler: function () {
                    dialog.$errorCount.empty();
                    dialog.$summary.show();
                    numErrors = dialog.validator.numberOfInvalids();
                    if (numErrors == 1)
                        dialog.$errorCount.text("1 field is invalid");
                    else
                        dialog.$errorCount.text(numErrors + " fields are invalid");
                },
                errorContainer: "#add_edit_validation_summary",
                success: function (label) {
                    label.html("&nbsp;");
                    label.parent().addClass('checked');
                    $(label).parent().parent().parent().removeClass('error');
                },
                onfocusout: function (element, event) {
                    dialog.validator.form();
                }
            };
            dialog.validator = null;
            // configure the modal hidden event.  Isn't it funny that bootstrap's own shortenting of their name is BS?
            dialog.$addEditDialog.on("hidden.bs.modal", function () {
                // Clear out error summary
                dialog.$errorCount.empty();
                dialog.$errorList.empty();
                dialog.$summary.hide();
                // Destroy the validator if it exists, both to save on resources, and to clear out any leftover junk.
                if (dialog.validator != null) {
                    dialog.validator.destroy();
                    dialog.validator = null;
                }
            });
            // configure the dialog shown event
            dialog.$addEditDialog.on("show.bs.modal", function () {
                Octolapse.Settings.AddEditProfile({ "profileObservable": dialog.profileObservable, "templateName": dialog.templateName });
                // Adjust the margins, height and position
                // Set title
                dialog.$dialogTitle.text(options.title);

                dialog.$addEditDialog.css({
                    width: 'auto',
                    'margin-left': function () { return -($(this).width() / 2); }
                });
            });
            // Configure the show event
            dialog.$addEditDialog.on("shown.bs.modal", function () {
                dialog.validator = dialog.$addEditForm.validate(rules);

                // Remove any click event bindings from the cancel button
                dialog.$cancelButton.unbind("click");
                // Called when the user clicks the cancel button in any add/update dialog
                dialog.$cancelButton.bind("click", function () {
                    // Hide the dialog
                    self.hideAddEditDialog();
                });

                // remove any click event bindings from the defaults button
                dialog.$defaultButton.unbind("click");
                dialog.$defaultButton.bind("click", function () {
                    newProfile = dialog.sender.getResetProfile(Octolapse.Settings.AddEditProfile().profileObservable());
                    Octolapse.Settings.AddEditProfile().profileObservable(newProfile);

                });

                // Remove any click event bindings from the save button
                dialog.$saveButton.unbind("click");
                // Called when a user clicks the save button on any add/update dialog.
                dialog.$saveButton.bind("click", function () {
                    if (dialog.$addEditForm.valid()) {
                        // the form is valid, add or update the profile
                        self.addUpdateProfile(Octolapse.Settings.AddEditProfile());
                    }
                    else {
                        // Search for any hidden elements that are invalid
                        //console.log("Checking ofr hidden field error");
                        $fieldErrors = dialog.$addEditForm.find('.error_label_container.error');
                        $fieldErrors.each(function (index, element) {
                            // Check to make sure the field is hidden.  If it's not, don't bother showing the parent container.
                            // This can happen if more than one field is invalid in a hidden form
                            $errorContainer = $(element);
                            if (!$errorContainer.is(":visible")) {
                                //console.log("Hidden error found, showing");
                                $collapsableContainer = $errorContainer.parents(".collapsible");
                                if ($collapsableContainer.length > 0)
                                    // The containers may be nested, show each
                                    $collapsableContainer.each(function (index, container) {
                                        //console.log("Showing the collapsed container");
                                        $(container).show();
                                    });
                            }

                        });

                        // The form is invalid, add a shake animation to inform the user
                        $(dialog.$addEditDialog).addClass('shake');
                        // set a timeout so the dialog stops shaking
                        setTimeout(function () { $(dialog.$addEditDialog).removeClass('shake'); }, 500);
                    }

                });
            });
            // Open the add/edit profile dialog
            dialog.$addEditDialog.modal();
        };


    };
    // Bind the settings view model to the plugin settings element
    OCTOPRINT_VIEWMODELS.push([
        Octolapse.SettingsViewModel
        , ["settingsViewModel", "loginStateViewModel"]
        , ["#octolapse_plugin_settings"]
    ]);

    
});





