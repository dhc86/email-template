import { module } from 'angular';
// import 'ngjs-email-builder';

const paths = {
  // Return JUST path of uploaded image, string.
  uploadImage:
    'https://firstamsandiegolinks.com/emailengine/functions/saveimage.php',
  // You're getting two properties, email and html!
  saveEmail:
    'https://firstamsandiegolinks.com/emailengine/functions/testemail.php',
  // Return email object with right property id, the right id from database.
  getEmail:
    'https://firstamsandiegolinks.com/emailengine/functions/getobject.php',
  // Change this with your own
  getModules: 'https://api.myjson.com/bins/1ca040'
};

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

// THIS IS JUST AN EXAMPLE OF HOW TO RUN CONFIG BUILDER
module('email', ['ngjs-email-builder-module'])
  .controller('mainCtrl', [
    '$scope',
    '$http',
    'ngbutils',
    class MainCtrl {
      constructor($scope, $http, ngbutils) {
        this.ngbutils = ngbutils;
        this.$scope = $scope;
        this.$http = $http;
        this.params = new URLSearchParams(location.search);
        this.email = {};
        this.modules = [];
        if (this.params.get('id')) {
          this.getEmailById();
        } else {
          this.email = {
            newEmailName: `My new email`,
            emailOptions: {
              paddingTop: '10px',
              paddingRight: '10px',
              paddingBottom: '30px',
              paddingLeft: '10px',
              backgroundColor: '#273142',
              font: {
                family: 'Tahoma, Geneva, sans-serif',
                size: 16,
                weight: 'normal',
                color: '#4d4d4d'
              },
              direction: 'ltr',
              width: 600
            },
            elements: [
              {
                type: 'title',
                defaults: {
                  align: 'center',
                  title: 'Links Email Builder',
                  subTitle: 'Hey, meet the new version of Links Email Builder!',
                  padding: ['20px', '15px', '20px', '15px'],
                  backgroundColor: '#ffffff',
                  font: {
                    family: 'Tahoma, Geneva, sans-serif',
                    size: 16,
                    weight: 'normal',
                    color: '#444444'
                  }
                },
                id: 'id15388354415425RAND53668'
              },
              {
                type: 'image',
                defaults: {
                  align: 'center',
                  padding: ['0px', '0px', '0px', '0px'],
                  backgroundColor: '#ffffff',
                  image: 'https://image.ibb.co/ipMH6a/ezgif_com_optimize1.gif',
                  width: 600,
                  altTag: 'Image alt',
                  linkTo: {
                    type: 'none',
                    link: ''
                  }
                },
                id: 'id153334505509RAND51661'
              },
              {
                type: 'divider',
                defaults: {
                  padding: ['15px', '15px', '15px', '15px'],
                  backgroundColor: '#ffffff',
                  border: {
                    size: 1,
                    style: 'solid',
                    color: '#DADFE1'
                  }
                },
                id: 'id1534534534RAND53013'
              },
              {
                type: 'text',
                defaults: {
                  padding: ['10px', '15px', '10px', '15px'],
                  backgroundColor: '#ffffff',
                  font: {
                    family: 'Georgia, serif',
                    size: 15,
                    weight: 'normal',
                    color: '#444444'
                  },
                  text:
                    '<p style="margin: 0px; text-align: center;"><span style="font-size: 15pt;"><strong>AngularJS Email Builder</strong>&nbsp;is an&nbsp;<strong>AngularJS</strong>&nbsp;component which allow you to have a super easy email builder in your application. Built with latest technologies, like&nbsp;<strong>Webpack</strong>&nbsp;and&nbsp;<strong>Babel</strong>, version 3 has a lot of opportunities and good Browsers support. It still use&nbsp;<strong>MJML</strong>&nbsp;for generate ready-to-use responsive HTML!</span></p>'
                },
                id: 'id1538832345345345RAND23471'
              },
              {
                type: 'divider',
                defaults: {
                  padding: ['15px', '15px', '15px', '15px'],
                  backgroundColor: '#ffffff',
                  border: {
                    size: 1,
                    style: 'solid',
                    color: '#DADFE1'
                  }
                },
                id: 'id15393333551486RAND59948'
              },
              {
                type: 'image',
                defaults: {
                  align: 'center',
                  padding: ['0px', '0px', '0px', '0px'],
                  backgroundColor: '#ffffff',
                  image: 'https://image.ibb.co/cvBH6a/ezgif_com_optimize2.gif',
                  width: 600,
                  altTag: 'Image alt',
                  linkTo: {
                    type: 'none',
                    link: ''
                  }
                },
                id: 'id15390434535541RAND82896'
              },
              {
                type: 'divider',
                defaults: {
                  padding: ['15px', '15px', '15px', '15px'],
                  backgroundColor: '#ffffff',
                  border: {
                    size: 1,
                    style: 'solid',
                    color: '#DADFE1'
                  }
                },
                id: 'id1533453535973RAND67295'
              },
              {
                type: 'text',
                defaults: {
                  padding: ['10px', '15px', '10px', '15px'],
                  backgroundColor: '#ffffff',
                  font: {
                    family: 'Tahoma, Geneva, sans-serif',
                    size: 15,
                    weight: 'normal',
                    color: '#444444'
                  },
                  text:
                    '<p style="text-align: center;"><span style="font-size: 15pt;">Thanks to many of our customers, and questions within our&nbsp;<a href="https://wlocalhost.org/" target="_blank" rel="noopener noreferrer">Forum</a>, we changed it to cover almost all custom requirements, such as&nbsp;<a class="" href="https://docs.wlocalhost.org/angularjs-email-builder/ngjs-service.html#upload-images">Uploading Photos</a>,&nbsp;<a class="" href="https://docs.wlocalhost.org/angularjs-email-builder/ngjs-service.html#text-editor">Text Editor</a>&nbsp;options,&nbsp;<a class="" href="https://docs.wlocalhost.org/angularjs-email-builder/ngjs-service.html#custom-data">Custom Data</a>&nbsp;and many others!</span></p>\n<p style="text-align: center;"><span style="font-size: 15pt;">There\'s no need to remember many things for customizing, just inject&nbsp;<a class="" href="https://docs.wlocalhost.org/angularjs-email-builder/ngjs-service.html">NGJS Service</a>&nbsp;in your main application and make changes, that\'s all!</span></p>'
                },
                id: 'id15395345345345555127058RAND69868'
              },
              {
                type: 'text',
                defaults: {
                  padding: ['10px', '15px', '10px', '15px'],
                  backgroundColor: '#ffffff',
                  font: {
                    family: 'Tahoma, Geneva, sans-serif',
                    size: 15,
                    weight: 'normal',
                    color: '#444444'
                  },
                  text:
                    '<p style="text-align: center;"><span style="font-size: 15pt;"><img src="https://firstamsandiegolinks.com/builder/images/rephorizontal.png" style="width:100%;" width="648" /></p>'
                },
                id: 'id166554329127058RAND89968'
              },
              {
                type: 'text',
                defaults: {
                  padding: ['10px', '15px', '10px', '15px'],
                  backgroundColor: '#ffffff',
                  font: {
                    family: 'Tahoma, Geneva, sans-serif',
                    size: 15,
                    weight: 'normal',
                    color: '#444444'
                  },
                  text:
                    '<p style="text-align: center;"><span style="font-size: 15pt;"><img src="https://firstamsandiegolinks.com/builder/images/repvertical.png" style="width:100%;" width="648" /></p>'
                },
                id: 'id16777532228RAND87768'
              }
            ],
            id: 324
          };
        }
      }

      async getEmailById() {
        try {
          const { data } = await this.$http.post(
            paths.getEmail,
            {
              id: this.params.get('id')
            },
            { headers }
          );
          if (!data) throw Error('Email was not found.');
          this.$scope.$evalAsync(() => {
            this.email = data;
          });
        } catch (error) {
          console.log(error);
          this.ngbutils
            .notify("Something wen't wrong, or this email doesn't exist.")
            .error();
        }
      }

      async $onInit() {
        try {
          const { data } = await this.$http.get(paths.getModules);
          this.$scope.$evalAsync(() => {
            this.modules = data;
          });
        } catch (error) {
          console.log(error);
        }
      }
      $onDestroy() {}
    }
  ])
  .run([
    'ngjs',
    '$http',
    function run(ngjs, $http) {
      ngjs.config = {
        mjmlPublicKey: '961d11e0-9ddc-47ed-95c6-825951e60d14',
        mjmlApplicationId: '17ba7701-c1aa-48ba-8407-443505ae5d43',
        exportHtml: false,
        deleteAllBlocks: true
      };

      ngjs.tinymceOptions = {
        setup(editor) {
          editor.addButton('mailchimpMergeTags', {
            type: 'menubutton',
            text: 'Merge Tags',
            icon: false,
            tooltip: 'Merge Tags',
            menu: [
              '{AgentName}',
              '{address}',
              '{propertyadress}',
              '{RepName1}',
              '{RepPhone1}',
              '{RepEmail1}',
              '{RepName2}',
              '{RepPhone2}',
              '{RepEmail2}',
              '{RepName3}',
              '{RepPhone3}',
              '{RepEmail3}',
              '{RepName4}',
              '{RepPhone4}',
              '{RepEmail4}',
              '{RepName5}',
              '{RepPhone5}',
              '{RepEmail5}',
              '{County}',
              '{RepWebsite}',
              '{RepHeaderImage}',
              '{teamnamemerger}',
              '{VideoName}',
              '{VideoURL}',
              '{onbehalf_repname}',
              '{branchname}',
              '{companyname}',
              '{createpdfcode}'
            ].map(text => ({
              text,
              onclick() {
                editor.insertContent(text);
              }
            }))
          });
        }
      };

      // Delete one from default custom
      ngjs.fonts.add('Georgia, serif');
      // ngjs.fonts.delete('Georgia, serif');

      ngjs.addTinymceToolbarButton('mailchimpMergeTags', 1);

      // Plugins
      ngjs.addTinymcePlugin('code');
      ngjs.addTinymceToolbarButton('code');
      // ngjs.addTinymceButton(null, 2, 2);

      ngjs.on('save', ({ email, html }) => {
        $http.post(paths.saveEmail, JSON.stringify({ email, html }), {
          headers
        });
      });

      ngjs.on('browse', function() {
        return new Promise(function(resolve, reject) {
          const modal = document.querySelector('.upload-modal');
          modal.removeAttribute('hidden');
          modal.classList.add('show');
          const inputFile = modal.querySelector('input');
          const uploadButton = modal.querySelector('button.upload');
          const cancelUploadButton = modal.querySelector('button.cancel');

          async function upload() {
            try {
              if (inputFile.files.length) {
                const formData = new FormData();
                formData.append('image', inputFile.files.item(0));
                const { data } = await $http.post(paths.uploadImage, formData, {
                  headers: {
                    'Content-Type': undefined
                  }
                });
                return resolve(data);
              } else {
                return resolve('');
              }
            } catch (error) {
              return reject(error);
            } finally {
              resetUpload();
            }
          }
          function resetUpload() {
            inputFile.value = null;
            uploadButton.removeEventListener('click', upload);
            cancelUploadButton.removeEventListener('click', resetUpload);
            inputFile.removeEventListener('change', activateButton);
            modal.hidden = true;
            modal.classList.remove('show');
            uploadButton.disabled = true;
            uploadButton.classList.add('disabled');
            return resolve('');
          }
          function activateButton() {
            uploadButton.disabled = !inputFile.files.length;
            uploadButton.classList.toggle('disabled', !inputFile.files.length);
          }
          inputFile.addEventListener('change', activateButton);
          uploadButton.addEventListener('click', upload);
          cancelUploadButton.addEventListener('click', resetUpload);
        });
      });

      // ngjs.on('delete', ({ id }) => {
      //   console.log(id);
      // });
    }
  ]);
