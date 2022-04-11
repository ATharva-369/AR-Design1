

AFRAME.registerComponent("models",{
    init : async function(){
        var models  = await this.getModels();
        var barcodes = Object.keys(models);
        barcodes.map(model =>{
            var eachModel = models[model];

            // Function to createModels
            this.createModels(eachModel);
        })
    },
    getModels : function(){
        // Get model details from the JSON file
        return fetch("js/modelList.json")
        .then(res=> res.json())
        .then(data => data);
    }   ,
    createModels : function(model){
        // Model details
        var modelName = model.model_name;
        var barcodeValue = model.barcode_value;
        var modelUrl = model.model_url


        // Scene
        var scene = document.querySelector("a-scene")

        // Adding marker entity for barcode marker
        var marker = document.createElement("a-marker");

        marker.setAttribute("id", `marker-${barcodeValue}`);
        marker.setAttribute("type","barcode");
        marker.setAttribute("model_name",modelName);
        marker.setAttribute("value",barcodeValue);
        marker.setAttribute("markerhandler",{});

        scene.appendChild(marker);

        if(barcodeValue === 0){
            var modelEl = document.createElement("a-entity");
            modelEl.setAttribute("id",`${modelName}`);
            modelEl.setAttribute("geometry",{
                primitive: "box",
                width:model.width,
                height:model.height
            });
            modelEl.setAttribute("position",model.position);
            modelEl.setAttribute("rotation",model.rotation);
            modelEl.setAttribute("material",{
                color : model.color
            });
            marker.appendChild(modelEl);
        }else{
            var modelEl = document.createElement("a-entity");
            modelEl.setAttribute("id",`${modelName}`);
            modelEl.setAttribute("gltf-model",`url(${modelUrl})`)
            modelEl.setAttribute("scale",model.scale);
            modelEl.setAttribute("position",model.position);
            modelEl.setAttribute("rotation",model.rotation);
            marker.appendChild(modelEl);
        }
    }
})