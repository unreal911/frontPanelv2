
const initFileImg=()=>{

  var iFileSize = 0;
  function readURL(fileInput){
       var files = fileInput.files;
       for (var i = 0; i < files.length; i++) {
           var file = files[i];
           iFileSize = file.size;
           var imageType = /image.*/;
           if (!file.type.match(imageType)) {
               continue;
           }
       }
  }
  function bytesToSize(bytes) {
     var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
     if (bytes == 0) return '0 Byte';
     var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
     return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };
  function updIndvDocs(){
    $(".upload-img").change(function(e){
      readURL(this);
      var $this = $(this);
      var file = $this[0].files[0];
      var fileName = e.target.files[0].name;
      var ext = $this.val().split('.').pop().toLowerCase();
      var $par = $(this).parents('li');
      var $msg = $par.find('.msg');
      var $fn = $par.find('.fileName');
      var $dt = $par.find('.docType');
      var $ds = $par.find('.fileSize');
      $msg.hide();
      $dt.hide();
      $par.removeClass('uploaded');
      $(this).parents('.user-files').find('.error').hide();
      if(iFileSize >= 10485760) { // 10 mb
        $msg.show().text('File is too large. Max 10 MB');
        $this.val('');
      }else if($.inArray(ext, ['png', 'jpg', 'gif', 'pdf']) == -1 && ext != ''){
        $msg.show().text('Invalid file format.');
        $this.val('');
      }else{
        $par.addClass('uploaded');
        $dt.show();
        $ds.text(bytesToSize(iFileSize));
        if(fileName.length > 18){
          $fn.html(fileName.substr(0, 9)+'...'+fileName.substr(fileName.length-6, fileName.length));
        }else{
          $fn.html(fileName);
        }
      }
    });

   $(document).on('click', '.removeFile', function(){
      var $par = $(this).parents('li');
      $par.find('.msg, .docType').hide();
      $par.find('input').val('');
      $par.removeClass('uploaded');
    });
  }

  //val
  function sideForm5(){
      var valid = true,
          indvUploads = [],
          allCheck1;
          $('.user-files1 input').each(function(){
              indvUploads.push($(this).val());
          });
          allCheck1 = $.inArray('', indvUploads);
          if(allCheck1 != -1){
              $('.user-files1 .error').show();
              valid = false;
          }
      return valid;
  }


  $(document).ready(function(){
    updIndvDocs();

    $('.js-submit').click(function(){
      if(sideForm5()){
        console.log('Done')
      }
    });

  });


}
initFileImg();
