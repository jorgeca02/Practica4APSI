const resolvers = {
    Human: {
        recipes: async (parent: RecipeSchema): Promise<MongoRecipeSchema[]|undefined> => {
            const recipes:any = await RecipesCollection.find({id:parent.id})
            if (recipes) {
                return recipes
                }
        },
    },
    Query: {
        getHuman: async (_:unknown, args: { id: string }): Promise<MongoHumanSchema|undefined> => {
            const human: MongoHumanSchema | undefined = await HumansCollection.findOne({id:args.id});
            return human;
        },
        getRecipe: async (_:unknown, args: { id: string }): Promise<MongoRecipeSchema|undefined> => {
            const recipe: MongoRecipeSchema | undefined = await RecipesCollection.findOne({id:args.id});
            return recipe;
        },
    },
    Mutation: {
        addHuman: (_:unknown, args: { name: string }):MongoHumanSchema => {
            const newHuman:MongoHumanSchema=({
                name: args.name,
                id: "1",
                recipes: []
            } as unknown as MongoHumanSchema);
            HumansCollection.insertOne(newHuman)
            return newHuman;
        },
        addRecipe: (_:unknown, args: { name: string, author:string }):MongoRecipeSchema => {
            const newRecipe:MongoRecipeSchema=({
                name: args.name,
                id: "1",
                author: args.author
            } as unknown as MongoRecipeSchema);
            RecipesCollection.insertOne(newRecipe)
            return newRecipe;
        },
    },
};