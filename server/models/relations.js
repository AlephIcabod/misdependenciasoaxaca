const Dependencia=require('./dependencia'),
       Comentario=require('./comentario'),
       Sucursal=require('./sucursal'),
       Tramite=require('./tramite'),
       Categoria=require('./categoria');

const dataCat=require('../datos/categoria'),
      dataDepen=require('../datos/dependencia'),
      dataTramite=require('../datos/tramite'),
      dataSucur=require('../datos/sucursal');


Categoria.belongsToMany(Dependencia,{through:'idCategoria'});
Dependencia.belongsToMany(Tramite,{through:'idDependencia'});
Dependencia.belongsToMany(Sucursal,{through:'idDependencia'});
Sucursal.belongsToMany(Comentario,{through:'idSucursal'});

Categoria.sync({force:true}).then(()=>{    
    Dependencia.sync({force:true}).then(()=>{
        Sucursal.sync({force:true}).then(()=>{
            Comentario.sync({force:true}).then(()=>{   
            });
            Tramite.sync({force:true}).then(()=>{
                console.log("Sincronizando");
                dataTramite.map((data)=>{
                    Tramite.create(data).then(()=>{
                        console.log("Tramite registrado");
                    });
                });
            });
            dataSucur.map((data)=>{
                Sucursal.create(data).then(()=>{
                    console.log("Sucursal registrada");
                })
            });
        });             
        dataDepen.map((data)=>{
            Dependencia.create(data)
            .then(()=>{console.log("Dependencia creada")});
        })
    });
    
    dataCat.map((data)=>{
        Categoria.create(data)
        .then(()=>{console.log("categorias creadas")});
    });
});


