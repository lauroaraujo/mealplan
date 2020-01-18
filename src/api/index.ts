import MealPlanAPI from './MealPlanAPI'

const PORT = parseInt(process.env.PORT || '0', 10)

const api = new MealPlanAPI(PORT)
api.start()
