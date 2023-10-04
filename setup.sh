# create base directories
mkdir src
mkdir src/controllers
mkdir src/models
mkdir src/routes
mkdir src/utils

#create base files
touch index.ts
touch app.ts

echo "Enter the base controllers name! \nJust use the name, no extension , i.e newsController.ts should be entered as just news"
read base_controller_name
touch src/controllers/${base_controller_name}Controller.ts

echo "Enter the base router name! \nJust use the name, no extension , i.e newsRouter.ts should be entered as just news"
read base_router_name
touch src/routes/${base_router_name}Router.ts

echo "Enter the base model name! \nJust use the name, no extension , i.e newsModel.ts should be entered as just news"
read base_model_name
touch src/models/${base_model_name}Model.ts

