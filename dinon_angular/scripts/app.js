var app = angular.module('appDinon',["ngRoute","ngResource","ui.bootstrap","vcRecaptcha","ng-rut"]);
	
	// RUTAS
	app.config(function($routeProvider) {
		$routeProvider			
		.when('/',{
			templateUrl: "templates/index.html",
			controller : "indexController"
		})		
		.when('/ficha/:id',{
			templateUrl: "templates/ficha.html",
			controller : "fichaController"
		}).when('/nivel2/:id',{
			templateUrl: "templates/nivel2.html",
			controller : "nivel2Controller"
		})
		.when('/nivel3/:id',{
			templateUrl: "templates/nivel3.html",
			controller : "nivel3Controller"
		})
		.when('/familias/:id',{
			templateUrl: "templates/nivel1.html",
			controller : "nivel1Controller"
		})
		.when('/buscadores/:palabra',{
			templateUrl: "templates/buscadores.html",
			controller : "busquedaController"
		})
		.when('/filtroSoportes/',{
			templateUrl: "templates/soportes.html",
			controller : "controladorSoportes"
		})
		.when('/contacto/',{
			templateUrl: "templates/contacto.html",
			controller : "contactoController"
		})
		.when('/distribuidor/',{
			templateUrl: "templates/serDistribuidor.html",
			controller : "distribuidorController"
		})
		.
        otherwise({
            redirectTo: '/'
        });
	});



	//CONTROLLERS
	
	app.controller('indexController', ['$scope', '$route', 'Productos', function($scope, $route, Productos) {
		Productos.get(function(data){
			$scope.productos = data.response;	 
		});			
	}]);
	
	
	app.controller('navController', ['$scope', '$route', 'Familias','$location', function($scope, $route, Familias,$location) {
		 Familias.get(function(data){
			$scope.familias = data.response;
		});			
		$scope.busqueda = function(palabra){
			  $location.url('/buscadores/' + palabra);
		}	
	}]);	
	
	app.controller('fichaController', ['$scope', '$routeParams', 'Productos', function($scope, $routeParams, Productos) {
		  Productos.get({id: $routeParams.id}, function(data) {
			$scope.producto = data.response;
		  });
		
	}]);
	
	app.controller('busquedaController', ['$scope', '$routeParams','FamiliasBuscador','ProductosBuscador', function($scope, $routeParams,FamiliasBuscador,ProductosBuscador) {
		
		  $scope.filteredProductosBuscador = [];
		  $scope.currentPage = 1;
		  $scope.numPerPage = 20;
		  $scope.maxSize = 5;	
		  $scope.palabra = $routeParams.palabra;
		  
		FamiliasBuscador.get({ id: $routeParams.palabra },function(data){
			$scope.familias = data.response;
		});
		
		ProductosBuscador.get({id:$routeParams.palabra},function(data2){
			$scope.productosBuscador = data2.response;
			
			 $scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					, end = begin + $scope.numPerPage;
					
					$scope.filteredProductosBuscador = $scope.productosBuscador.slice(begin, end);
				  });
				  
			 $scope.numPages = Math.ceil($scope.productosBuscador.length / $scope.numPerPage);
			
		});
		
		
	}]);	
		
	app.controller('nivel1Controller', ['$scope', '$routeParams', 'Familias','Nivel1', function($scope,$routeParams,Familias,Nivel1) {
		
		  $scope.filteredProductos = [];
		  $scope.currentPage = 1;
		  $scope.numPerPage = 20;
		  $scope.maxSize = 5;
		  
		  Familias.get({id: $routeParams.id}, function(data) {			  
			$scope.familias2 = data.response;
		  });
		  
		  Nivel1.get({id: $routeParams.id},function(data2){
		  		
				 $scope.prodNivel1 = data2.response;
				
				 $scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					, end = begin + $scope.numPerPage;
					
					$scope.filteredProductos = $scope.prodNivel1.slice(begin, end);
				  });
				  
				  $scope.numPages = Math.ceil($scope.prodNivel1.length / $scope.numPerPage);
		  });
	}]);
	
	app.controller('nivel2Controller', ['$scope', '$routeParams','$http','Familias2','Nivel2','Vesas','MyService', function($scope,$routeParams,$http,Familias2,Nivel2,Vesas,MyService) {
		 
		  $scope.filteredProductos2 = [];
		  $scope.currentPage = 1;
		  $scope.numPerPage = 20;
		  $scope.maxSize = 5;
		  $scope.url = $routeParams.id;
		  Familias2.get({id: $routeParams.id}, function(data) {			  
			$scope.familias2 = data.response;
		  });
		  $scope.validacion = MyService.data.validacion;
		  Nivel2.get({id: $routeParams.id},function(data2){
		  		
				 $scope.prodNivel2 = data2.response;
				
				 $scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					, end = begin + $scope.numPerPage;
					
					$scope.filteredProductos2 = $scope.prodNivel2.slice(begin, end);
				  });
				  
				 $scope.numPages = Math.ceil($scope.prodNivel2.length / $scope.numPerPage);
		  });
		  
		  $scope.url_soportes = MyService.data.url_soporte ;
		 
			
		  
	}]);
	
	
	app.controller('nivel3Controller', ['$scope', '$routeParams','Nivel3', function($scope,$routeParams,Nivel3) {
		 
		  $scope.filteredProductos3 = [];
		  $scope.currentPage = 1;
		  $scope.numPerPage = 20;
		  $scope.maxSize = 5;
		  
		  Nivel3.get({id: $routeParams.id},function(data){
		  		
				 $scope.prodNivel3 = data.response;
				
				 $scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					, end = begin + $scope.numPerPage;
					
					$scope.filteredProductos3 = $scope.prodNivel3.slice(begin, end);
				  });
				  
				$scope.numPages = Math.ceil($scope.prodNivel3.length / $scope.numPerPage);
		  });
	}]);
	
	//FILTRO SOPORTES 
	
	app.controller('filtroSoporte', ['$scope','$route','Vesas' ,'filtrarSoportes','$location','MyService',function($scope,$route,Vesas,filtrarSoportes,$location,MyService) {
				
		var pulgadas = [];	
		pulgadas.push(0);	
		for(var i=13;i<100;i++) {				
			  pulgadas.push(i);
		}
		
		 Vesas.get(function(data){
			  $scope.vesas = data.response;
		 });
		  		
		$scope.pulgadas = pulgadas;
		
		$scope.buscarSoportes = function(p_vesa,pulgada,url){
			 	
			  	var array = p_vesa.split('x');  				
				var vesaDesde = array[0];
				var vesaHasta = array[1];				
				
				vesaDesde = jQuery.trim(vesaDesde) ;
				vesaHasta = jQuery.trim(vesaHasta) ;

				if(typeof pulgada === 'undefined'){MyService.data.pulgadasDesde = 0;}else{MyService.data.pulgadasDesde = pulgada;};
				if( p_vesa == 'x'){MyService.data.vesaDesde = 0;}else{MyService.data.vesaDesde = vesaDesde;};
				if( p_vesa == 'x'){MyService.data.vesaHasta = 0;}else{MyService.data.vesaHasta = vesaHasta;};
				
				MyService.data.url = url;
			
				$location.url('/filtroSoportes/');
			 
		}		
		
	}]);
	
			
	app.controller('controladorSoportes', ['$scope','$route','Vesas' ,'$http','MyService','$location',function($scope,$route,Vesas,$http,MyService,$location) {
		
		if((MyService.data.vesaDesde == 0) && (MyService.data.vesaHasta == 0) && (MyService.data.pulgadasDesde == 0)){
			$location.url('/nivel2/'+MyService.data.url_soporte);			
		}
		$scope.filteredProductosSoporte = [];
		$scope.currentPage = 1;
		$scope.numPerPage = 20;
	    $scope.maxSize = 5;
		
		var vesaDesde = MyService.data.vesaDesde;
		var vesaHasta = MyService.data.vesaHasta;
		var pulgadas = MyService.data.pulgadasDesde;
			 
	  $http.post("http://www.dinon.cl/index.php/rest_server/filtrarSoportes/", 
	  		{
				desde: vesaDesde, hasta: vesaHasta,pulgada  : pulgadas
			})
			.success(function(respuesta){
	
				if( respuesta.response.length == 0 ){
						
						MyService.data.validacion = true;
						$location.url('/nivel2/'+MyService.data.url_soporte);
						
				}
				else{				
				$scope.productosFiltro = respuesta.response;		
				$scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					, end = begin + $scope.numPerPage;
					
					$scope.filteredProductosSoporte = $scope.productosFiltro.slice(begin, end);
				  });
				  
				$scope.numPages = Math.ceil($scope.productosFiltro.length / $scope.numPerPage);
				
				}				
			})
								
				
		
	}]);
	
	//FORMULARIOS
	
	app.controller('distribuidorController', ['$scope', '$route','$location','$http','vcRecaptchaService','upload',function($scope, $route,$location,$http,vcRecaptchaService,upload) {
		$scope.publicKey = "6LetZRgTAAAAAPG7J789po-aDXpYxf20fs0LV49Y";
		
		$http.get("http://www.dinon.cl/index.php/rest_server/selectRegiones/", 
	  		{})
			.success(function(respuesta){
				   $scope.regiones = respuesta.response;				  						
			});

		
		$scope.cambiaProvincia = function(id_region){
			
			$http.post("http://www.dinon.cl/index.php/rest_server/selectProvincias/", 
	  		{
				id_region : id_region
			})
			.success(function(respuesta2){
				   $scope.provincias = respuesta2.response;	
				    $scope.comunas = {};							
			});
		}
		$scope.cambiaComuna = function(id_provincia){
			
			$http.post("http://www.dinon.cl/index.php/rest_server/selectComunas/", 
	  		{
				id_provincia : id_provincia
			})
			.success(function(respuesta3){
				   $scope.comunas = respuesta3.response;							
			});
		}		
		$scope.enviarFormulario = function(datosDistribuidor){
			var file = $scope.file ;
			var url_archivo = "";
			upload.uploadFile(file).then(function(response){
			
			$http.post("http://www.dinon.cl/index.php/rest_server/crearDistribuidor/", 
	  		{
				rut:datosDistribuidor.rut,nombre: datosDistribuidor.nombre, telefono:datosDistribuidor.telefono,email : datosDistribuidor.email,
				empresa : datosDistribuidor.empresa , direccion : datosDistribuidor.direccion , id_region : datosDistribuidor.region,
				id_provincia : datosDistribuidor.provincia,id_comuna:datosDistribuidor.comuna, url_archivo :  response.data.response  ,"recaptchaResponse" : vcRecaptchaService.getResponse()
			})
			.success(function(respuesta){
				   if(respuesta.error === 0){
                        alert("Formulario enviado exitosamente");
						$scope.datosDistribuidor = {};	
						$location.url('/');
                    }else{
                        alert("Debes resolver el captcha para continuar..");
						
                    }
							
			});
		  })	
		}
	}]);
	
	app.controller('contactoController', ['$scope', '$route','$http','vcRecaptchaService', function($scope, $route,$http,vcRecaptchaService) {
		$scope.datosContacto = {};
		
		$scope.publicKey = "6LetZRgTAAAAAPG7J789po-aDXpYxf20fs0LV49Y";		
	
		
		$scope.regiones = [
					{region:"I Region"},
					{region:"II Region"},
					{region:"III Region"},
					{region:"IV Region"},
					{region:"V Region"},
					{region:"VI Region"},					
					{region:"Region Metropolitana"},
					{region:"VII Region"},
					{region:"VIII Region"},
					{region:"IX Region"},
					{region:"X Region"},
					{region:"XI Region"},
					{region:"XII Region"},
					{region:"XIV Region"},
					{region:"XV Region"}
						];
						
		 $scope.submitForm = function (datosContacto) {
			$http.post("http://www.dinon.cl/index.php/rest_server/enviarContacto/", 
	  		{
				nombre: datosContacto.nombre, telefono: datosContacto.telefono,email : datosContacto.email,
				empresa : datosContacto.empresa , direccion : datosContacto.direccion , asunto : datosContacto.asunto,
				mensaje : datosContacto.mensaje,region:datosContacto.region,"recaptchaResponse" : vcRecaptchaService.getResponse()
			})
			.success(function(respuesta){
				   if(respuesta.error === 0){
                        alert("Formulario enviado exitosamente");
						$scope.datosContacto = {};	
						$location.url('/');
                    }else{
                        alert("Debes resolver el captcha para continuar..");
						
                    }
							
			})
		 };		
	}]);
	
	//DIRECTIVAS
	
	
	app.directive("uploaderModel", ["$parse",function ($parse) {
			return {
				restrict: "A",
				link: function(scope, element, attrs) {
					var model = $parse(attrs.uploaderModel);
					var modelSetter = model.assign;
					
					element.bind("change", function(){
						scope.$apply(function(){
							if (element[0].files.length > 1) {
								modelSetter(scope, element[0].files);
							}
							else {
								modelSetter(scope, element[0].files[0]);
							}
						});
					});
				}
			};
}
])
	
	//SERVICES
	
	app.service('upload',["$http","$q",function($http,$q){
		this.uploadFile = function(file){
			var deferred = $q.defer();
			var formData = new FormData();
			formData.append('file',file);
			return $http.post("http://www.dinon.cl/index.php/rest_server/subirArchivo/",formData,{
				headers:{
					"Content-type":undefined	
				},
				transformRequest : formData
			})
			.success(function(res){
				deferred.resolve(res);	
			})
			.error(function(msg,code){
				deferred.reject(msg);
			})
			return deferred.promise;
		}
	}]);
	
	//FACTORYS
	
	app.factory('Productos', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/productos/:id',{ id: '@id' },{
                update: { method: "PUT",params:{id:"@seoslug"}}                
            }
        );
    }
	

	]);
	
	app.factory('Nivel1', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/nivel1Productos/:id',{ id: '@id' },{
                update: { method: "GET",params:{id:"@id"}}    
            }
        );
  	  }
	]);
	
	app.factory('Nivel2', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/nivel2Productos/:id',{ id: '@id' },{
                update: { method: "GET",params:{id:"@id"}}    
            }
        );
  	  }
	]);
	
	app.factory('Nivel3', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/nivel3Productos/:id',{ id: '@id' },{
                update: { method: "GET",params:{id:"@id"}}    
            }
        );
  	  }
	]);

	app.factory('Familias', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/fam/:id',{ id: '@id' },{
                update: { method: "GET",params:{id:"@id"}}    
            }
        );
  	  }
	]);
	
	app.factory('Familias2', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/fam2/:id',{ id: '@id' },{
                update: { method: "GET",params:{id:"@id"}}    
            }
        );
  	  }
	]);
	
	app.factory('FamiliasBuscador', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/famBuscador/:id',{ id: '@id' },{
                update: { method: "GET",params:{id:"@id"}}    
            }
        );
  	  }
	]);
	
	app.factory('ProductosBuscador', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/prodBuscador/:id',{ id: '@id' },{
                update: { method: "GET",params:{id:"@id"}}    
            }
        );
  	  }
	]);
	
	app.factory('Vesas', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/soporteVesas/',{ id: '@id' },{
                update: { method: "GET",params:{id:"@id"}}    
            }
        );
  	  }
	]);
	
	app.factory('filtrarSoportes', ['$resource',function ($resource) {
        return $resource('http://www.dinon.cl/index.php/rest_server/filtrarSoportes/:id',{id:"@id" }
		    
            
        );
  	  }
	]);
	
	app.factory("MyService", function() {
	  return {
		data: {url_soporte:"soporte-lcdledplasma-106",validacion : false}
	  };
	});
	
