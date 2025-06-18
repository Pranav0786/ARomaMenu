export type RootStackParamList = {

  // Welcoming Routes
  MainPage: undefined;

  // Auth Routes
  Login: undefined;
  Signup: undefined;
  AuthLoading: undefined;

  // Common Routes
  Home: undefined;
  ProfileScreen: undefined;

  // Customer Routes
  CustomeHome: undefined;
  ProductScreen: undefined;
  GetFood: undefined;
  FoodScreen: undefined;
  MakeOrder: undefined;
  Myorders: undefined;
  AddToCart: {
    food: {
      title: string;
      price: number;
      imageurl: string;
    };
  };
  Payment: {
    cartItems: {
      id: number;
      name: string;
      price: number;
      imageUrl: string;
      quantity: number;
    }[];
    totalPrice: number;
  };

  // Manager Routes
  Restaurants: undefined;
  AddFoods: undefined;
  ManagerHome: undefined;
  ManagerDashboard: undefined;
  DashBoard: undefined;

  // AR Routes
  AR: undefined;
  WorldAR: undefined;
};
