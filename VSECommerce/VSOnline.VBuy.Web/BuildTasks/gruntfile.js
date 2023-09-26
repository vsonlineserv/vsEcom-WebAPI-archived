

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    '../Content/app/css/cardstyle.css'				 
					,'../Content/app/css/styles.css'
					,'../Content/app/css/menustyle.css'
					,'../Content/app/css/rating.css'
					,'../Content/app/css/jquery.bxslider.css'
					,'../Content/app/css/others.css'
					,'../Content/app/css/Orders.css'
					,'../Content/app/css/jasny-bootstrap.min.css'
                ],
                dest: 'vbuyapp/app.css'
            },
            appcontrollerjs: {
                src: [
                    '../app/controllers/*'
                ],
                dest: 'vbuyapp/appcontroller.js'
            },
			  appservicesjs: {
                src: [
                    '../app/services/*'
                ],
                dest: 'vbuyapp/appServices.js'
            },			
			retailercontrollerjs: {
                src: [
                    '../app_retailer/controllers/*'
                ],
                dest: 'vbuyapp/retailercontroller.js'
            },
			retailerServicesjs: {
                src: [
                    '../app_retailer/services/*'
                ],
                dest: 'vbuyapp/retailerServices.js'
            }
			,
			scriptsjs: {
                src: [
                    '../Scripts/jquery.min.js'
					,'../Scripts/bootstrap.min.js'
					,'../Scripts/jquery.bxslider.min.js'
					,'../Scripts/angular.min.js'
					,'../Scripts/angular-animate.min.js'
					,'../Scripts/angular-route.min.js'
					,'../Scripts/angular-sanitize.min.js'
					,'../Scripts/angular-strap.min.js'
					,'../Scripts/angular-strap.tpl.min.js'
					,'../Scripts/jquery.elevatezoom.js'
					,'../Scripts/loading-bar.js'
					,'../Scripts/bootstrap-slider.js'
					,'../Scripts/angularjs-viewhead.js'
					,'../Scripts/angular-facebook.js'
					,'../Scripts/google-plus-signin.js'
					,'../Scripts/angular-local-storage.min.js'
					,'../Scripts/angular-cookies.min.js'
					,'../Scripts/VBuyElementFlyer.js'
					,'../Scripts/lodash.min.js'
					,'../Scripts/angularjs-dropdown-multiselect.js'
					,'../Scripts/ng-breadcrumbs.vbuy.js' 
					,'../Scripts/jasny-bootstrap.min.js'					
                ],
                dest: 'vbuyapp/Mergedscripts.js'
            }
			,retailerscriptsjs: {
                src: [
                    '../Scripts/jquery.min.js'
					,'../Scripts/angular.min.js'
					,'../Scripts/angular-animate.min.js'
					,'../Scripts/angular-route.min.js'
					,'../Scripts/angular-sanitize.min.js'
					,'../Scripts/angular-strap.min.js'
					,'../Scripts/angular-strap.tpl.min.js'
					,'../Scripts/angular-local-storage.min.js'
					,'../Scripts/loading-bar.js'
					,'../Scripts/ng-table.js'
					,'../Scripts/angular-cookies.min.js'
					,'../Scripts/angular-file-upload.js'
                ],
                dest: 'vbuyapp/MergedRetailerscripts.js'
            }
        },
		uglify:{
		 options: {
			// the banner is inserted at the top of the output
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		},
		 appcontrollerjsmin: {
               src: [
                    'vbuyapp/appcontroller.js'
                ],
                dest: 'vbuyapp/appcontroller.min.js'
            },
			  appservicesjsmin: {
                src: [
                    'vbuyapp/appServices.js'
                ],
                dest: 'vbuyapp/appServices.min.js'
            },
			retailercontrollerjsmin: {
               src: [
                    'vbuyapp/retailercontroller.js'
                ],
                dest: 'vbuyapp/retailercontroller.min.js'
            },
			retailerServicesjsmin: {
			src: [
                    'vbuyapp/retailerServices.js'
                ],
                dest: 'vbuyapp/retailerServices.min.js'
			}
		}
		,
		cssmin :
		{
		appcssmin:
			{
		 src: [
                    'vbuyapp/app.css'
                ],
                dest: 'vbuyapp/app.min.css'
				}
		}
	});
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat:css', 'concat:appcontrollerjs'
	,'concat:appservicesjs', 'concat:retailercontrollerjs', 'concat:retailerServicesjs', 'concat:scriptsjs'
	, 'concat:retailerscriptsjs'
	, 'uglify:appcontrollerjsmin', 'uglify:appservicesjsmin', 
	'uglify:retailercontrollerjsmin'
	,'uglify:retailerServicesjsmin'
	, 'cssmin:appcssmin']);
};