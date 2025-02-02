(function( $, undefined ) {

    $.widget("ui.dropmenuEx", {
    
        options:{         
            themed: false
        },
        
        
        _create: function(){
            
            var self = this,
            options = self.options;
            

            
            $(window).bind("keydown", function(event){
                //console.log(event);
                
                if (event.keyCode == 77 && event.altKey == true){
                    self.element.find("li:eq(0) a").focus().addClass("dropmenu-ex-active");
                }
            })
            
            self.element.addClass("ui-widget ui-corner-all");
                       
            var items = self.element.find("li ul");
            
            $.each(items, function(i, val){                                                             
                 items.eq(i).parent().find("a:eq(0)").append("<span></span>").end().addClass("haschild");
            });
            
            
            var itensPrimarios = self.element.children("li");
            
            $.each(itensPrimarios, function(i, val){                                                             
                 itensPrimarios.eq(i).addClass("primary");
            });            
            
                                   
            if (options.themed){                                              
                self.element.addClass("ui-state-default");                
            }
            
          
           
            self.element.find("li > a").bind("focus", function(){ 
                
                var $elemParent = $(this).closest("li");
                
                if ( $elemParent.hasClass("primary") ){
                    $(this).addClass("dropmenu-ex-active");       
                }else{
                    $(this).addClass("dropmenu-ex-subitem-active");       
                }
                                               
                if ( $elemParent.hasClass("haschild") ){
                    $elemParent.find("ul").eq(0).show();
                }
                
            }).bind("blur", function(){  
                
                
                
                //TODO, quando o subitem recebe o foco o submenu se fecha
                
                var $elemParent = $(this).closest("li");
                              
                
                
                if ( $elemParent.hasClass("primary") ){
                    $(this).removeClass("dropmenu-ex-active");       
                }else{
                    $(this).removeClass("dropmenu-ex-subitem-active");       
                }
                
                
                if ( $elemParent.hasClass("haschild") && !$elemParent.find("a.dropmenu-ex-subitem-active").is("a") ){
                    
                    $elemParent.find("ul").eq(0).hide();
                }                
                
            });               
            
            
            
            

            
            self.element.find("li a").bind("keydown", function(event){
                                
                //seta para direita
                if (event.keyCode == 39)   {  
                    
                    //TODO o não esta detectando corretamente o último item primário
//                    if (!self.element.find("li a:last").hasClass("dropmenu-ex-active")){     
//                        
//                        self.element.find("li a.dropmenu-ex-active")
//                                    .removeClass("dropmenu-ex-active")
//                                    .closest("li")
//                                    .next("li")
//                                    .find("a:eq(0)")
//                                    .addClass("dropmenu-ex-active")
//                                    .focus();
//   
//                    }

                    if ( $(this).closest("li").hasClass("primary") ){
                        $(this).closest("li").next("li").find("a:eq(0)").focus();
                    }else{
                        
                        if ( $(this).closest("li").hasClass("haschild") ){
                            $(this).closest("li").find("ul:eq(0)").find("li:eq(0) a:eq(0)").focus();
                        }
                        
                    }

                }
                
                //seta para esquerda              
                if (event.keyCode == 37){
                                                            
//                    if (!self.element.find("li a:first").hasClass("dropmenu-ex-active")){                                                    
//                       
//                        self.element.find("li a.dropmenu-ex-active")
//                                    .removeClass("dropmenu-ex-active")
//                                    .closest("li")
//                                    .prev("li")
//                                    .find("a:eq(0)")
//                                    .addClass("dropmenu-ex-active")
//                                    .focus();                          
//                    }    

                    if ( $(this).closest("li").hasClass("primary") ){
                        $(this).closest("li").prev("li").find("a:eq(0)").focus();
                    }else{
                        
                        if ( $(this).closest("li").closest("ul").closest("li").hasClass("haschild") && $(this).closest("li").is(":first")  ){
                            $(this).closest("li").closest("ul").closest("li").find("a:eq(0)").focus();
                            //alert("primeiro");
                        }
                        
                    }

                }
                
                //seta para baixo
                if (event.keyCode == 40){
                    
//                   if (self.element.find("li.dropmenu-ex-active").hasClass("haschild")){
//                            self.element.find("li.dropmenu-ex-active ul:eq(0) li:eq(0) a").addClass("dropmenu-ex-subitem-active").focus();
//                   }

                    //alert(  $(this).next().is("ul") );
                     //console.log( $(this) );
                     var $elemNext = $(this).next();
                     
                    // console.log( $elemNext);
                     
                      if ( $elemNext.is("ul") && $elemNext.closest("li").hasClass("primary")  ){
                          $elemNext.find("li:eq(0) a:eq(0)").focus();
                      }else{                                                    
                          $(this).closest("li").next("li").find("a:eq(0)").focus(); 
                      }
                   
                }
                
                
                //seta para cima
                if ( event.keyCode == 38 ){
                    
                    
                     var $elemUp = $(this).closest("li");
                                         
                      if ( !$elemUp.prev().is("li") ){
                          
                          $elemUp.closest("ul").closest("li").find("a:eq(0)").focus();

                      }else{                                                    
                          $(this).closest("li").prev("li").find("a:eq(0)").focus(); 
                      }                    
                    
                    
                }
                
                
                
                        
                        
              
               
                
            }).bind("mouseenter", function(event){                              
              // $(this).focus();                              
            }).bind("mouseleave", function(event){
              // $(this).blur(); 
            });
           
            
                           
        }        
    });
})( jQuery );
