

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    '../Content/app/css/cardstyle.css'
					,'../Content/app/css/styles.css'
					,'../Content/app/css/menustyle.css'
					,'../Content/app/css/jquery.bxslider.css'
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
			},
			appjsmin: {
                src: [
                    '../app/app.js'
                ],
                dest: 'vbuyapp/app.min.js'
            },
			retailerappjsmin: {
                src: [
                    '../app_retailer/retailerapp.js'
                ],
                dest: 'vbuyapp/retailerapp.min.js'
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
	,'concat:appservicesjs', 'concat:retailercontrollerjs', 'concat:retailerServicesjs',
	'uglify:appcontrollerjsmin', 'uglify:appservicesjsmin', 
	'uglify:retailercontrollerjsmin'
	,'uglify:retailerServicesjsmin', 'uglify:appjsmin', 'uglify:retailerappjsmin'
	, 'cssmin:appcssmin']);
};