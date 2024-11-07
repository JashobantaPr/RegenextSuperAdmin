
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Auth from "./Authentication/auth";
import "./index.scss";
import Loader from "./shade/Loaders/Loaders"
const App = React.lazy(() => import("../src/shade/layouts/App"));
const Switcherapp = React.lazy(() => import("../src/shade/layouts/Switcherapp"));
const Custompages = React.lazy(() => import("../src/shade/layouts/custompages"));
const Dashboard = React.lazy(() =>
  import("./components/Dashboard/Dashboard-1/Dashboard")
);
const Dashboard2 = React.lazy(() =>
  import("./components/Dashboard/Dashboard-2/Dashboard2")
);
const Dashboard3 = React.lazy(() =>
  import("./components/Dashboard/Dashboard-3/Dashboard3")
);
//App
const ABMManagement = React.lazy(() => import("./components/App/ABMManagement/ABMManagement.js"));
const ABMRegistration = React.lazy(() => import("./components/App/ABMManagement/ABMRegistration.js"));
const CreateABMManagement = React.lazy(() => import("./components/App/ABMManagement/CreateABMManagement.js"));
const Zonal = React.lazy(() => import("./components/App/Zonal/Zonal.js"));
const ZonalHeadRegistration = React.lazy(() => import("./components/App/Zonal/ZonalHeadRegistration.js"));
const ZonalHeadprofileCreate = React.lazy(() => import("./components/App/Zonal/ZonalHeadprofileCreate.js"));
const CreateTermsAndConditions = React.lazy(() =>
  import("./components/App/TremsAndConditions/CreateTermsAndConditions.js")
);
const TremsAndConditions = React.lazy(() =>
  import("./components/App/TremsAndConditions/TremsAndConditions.js")
);
const UpdateTermsAndConditions = React.lazy(() =>
  import("./components/App/TremsAndConditions/UpdateTermsAndConditions.js")
);
const MHManagement = React.lazy(() =>
  import("./components/App/MarketingHeadManagement/MHManagement.js")
);
const MHProfileCreation = React.lazy(() =>
  import("./components/App/MarketingHeadManagement/MHProfileCreation.js")
);
const MHRegistration = React.lazy(() =>
  import("./components/App/MarketingHeadManagement/MHRegistration.js")
);

const Doctor = React.lazy(() =>
  import("./components/App/Doctor/Doctor.js")
);
const Stockist = React.lazy(() =>
  import("./components/App/Stockist/Stockist.js")
);
const AddStockist = React.lazy(() =>
  import("./components/App/Stockist/AddStockist.js")
);
const Products = React.lazy(() =>
  import("./components/App/Products/Products.js")
);
const UpdateProduct = React.lazy(() =>
  import("./components/App/Products/UpdateProduct.js")
);
const AddProduct = React.lazy(() =>
  import("./components/App/Products/AddProduct.js")
);
const Clinical = React.lazy(() => import("./components/App/Clinical/Clinical.js"));
const ClinicalProfileCreate = React.lazy(() => import("./components/App/Clinical/ClinicalProfileCreate.js"));
const ClinicalRegistration = React.lazy(() => import("./components/App/Clinical/ClinicalRegistration.js"));

const TBMRegistration = React.lazy(() => import("./components/App/TBMManagement/TBMRegistration"));
const TBMManagement = React.lazy(() => import("./components/App/TBMManagement/TBMManagement"));
const CreateTBMManagement = React.lazy(() => import("./components/App/TBMManagement/CreateTBMManagement.js"));

const Finance = React.lazy(() =>
  import("./components/App/FinanceHeadManagement/Finance.js")
);
const FinanceHeadProfileCreate = React.lazy(() =>
  import("./components/App/FinanceHeadManagement/FinanceHeadProfileCreate.js")
);
const FinanceHeadRegistration = React.lazy(() =>
  import("./components/App/FinanceHeadManagement/FinanceHeadRegistration.js")
);
const Sales = React.lazy(() =>
  import("./components/App/Sales/Sales.js")
);
const SalesHeadRegistration = React.lazy(() =>
  import("./components/App/Sales/SalesHeadRegistration.js")
);
const SalesProfileCreate = React.lazy(() =>
  import("./components/App/Sales/SalesProfileCreate.js")
);
const HelpAndSupport = React.lazy(() =>
  import("./components/App/HelpAndSupport/HelpAndSupport.js")
);
const CreateHelpAndSupport = React.lazy(() =>
  import("./components/App/HelpAndSupport/CreateHelpAndSupport.js")
);
const UpdateHelpAndSupport = React.lazy(() =>
  import("./components/App/HelpAndSupport/UpdateHelpAndSupport.js")
);
const CreatePrivacy = React.lazy(() =>
  import("./components/App/Privacy/CreatePrivacy.js")
);
const Privacy = React.lazy(() =>
  import("./components/App/Privacy/Privacy.js")
);
const UpdatePrivacy = React.lazy(() =>
  import("./components/App/Privacy/UpdatePrivacy.js")
);
//App end
//Element
const Images = React.lazy(() => import("./components/Elements/Images/Images"));
const Alerts = React.lazy(() => import("./components/Elements/Alerts/Alerts"));
const Avatar = React.lazy(() => import("./components/Elements/Avatar/Avatar"));
const Breadcrumbs = React.lazy(() =>
  import("./components/Elements/Breadcrumbs/Breadcrumbs")
);
const Buttons = React.lazy(() =>
  import("./components/Elements/Buttons/Buttons")
);
const Badges = React.lazy(() => import("./components/Elements/Badge/Badge"));
const Dropdowns = React.lazy(() =>
  import("./components/Elements/Dropdown/Dropdown")
);
const Thumbnails = React.lazy(() =>
  import("./components/Elements/Thumbnails/Thumbnails")
);
const ListGroups = React.lazy(() =>
  import("./components/Elements/ListGroup/ListGroup")
);
const Mediaobject = React.lazy(() =>
  import("./components/Elements/Mediaobject/Mediaobject")
);
const Navigation = React.lazy(() =>
  import("./components/Elements/Navigation/Navigation")
);
const Pagination = React.lazy(() =>
  import("./components/Elements/Pagination/Pagination")
);
const Popover = React.lazy(() =>
  import("./components/Elements/Popover/Popover")
);
const Progress = React.lazy(() =>
  import("./components/Elements/Progress/Progress")
);
const Spinners = React.lazy(() =>
  import("./components/Elements/Spinners/Spinners")
);
const Typography = React.lazy(() =>
  import("./components/Elements/Typography/Typography")
);
const Tooltip = React.lazy(() =>
  import("./components/Elements/Tooltip/Tooltip")
);
const Toast = React.lazy(() => import("./components/Elements/Toast/Toast"));
const Tabs = React.lazy(() => import("./components/Elements/Tabs/Tabs"));
const Tags = React.lazy(() => import("./components/Elements/Tags/Tags"));

//Element end
//advancedui
const Accordions = React.lazy(() =>
  import("./components/AdvancedUI/Accordion/Accordion")
);
const Modals = React.lazy(() =>
  import("./components/AdvancedUI/Modals/Modals")
);
const Rating = React.lazy(() =>
  import("./components/AdvancedUI/Ratings/Ratings")
);
const Carousel = React.lazy(() =>
  import("./components/AdvancedUI/Carousel/Carousel")
);
const Collapse = React.lazy(() =>
  import("./components/AdvancedUI/Collapse/Collapse")
);
const Timeline = React.lazy(() =>
  import("./components/AdvancedUI/Timeline/Timeline")
);
const Sweetalert = React.lazy(() =>
  import("./components/AdvancedUI/Sweetalert/Sweetalert")
);
const Counters = React.lazy(() =>
  import("./components/AdvancedUI/Counters/Counters")
);
const Blog = React.lazy(() => import("./components/AdvancedUI/Blog/Blog"));
const Userlist = React.lazy(() =>
  import("./components/AdvancedUI/Userlist/Userlist")
);
const Search = React.lazy(() =>
  import("./components/AdvancedUI/Search/Search")
);
const Blogdetails = React.lazy(() =>
  import("./components/AdvancedUI/Blog-details/Blogdetails")
);
const EditPost = React.lazy(() =>
  import("./components/AdvancedUI/Edit-post/Editpost")
);
const Fileattachments = React.lazy(() =>
  import("./components/AdvancedUI/FileAttachments/FileAttachments")
);
//advancedui
//charts
const Apexcharts = React.lazy(() =>
  import("./components/Charts/Apexcharts/Apexcharts"))
const ChartJS = React.lazy(() =>
  import("./components/Charts/ChartJS/ChartJS"))
const Widgets = React.lazy(() =>
  import("./components/Widgets/Widgets"))
const Echart = React.lazy(() =>
  import("./components/Charts/Echart/Echart"))
const Nvd3Charts = React.lazy(() =>
  import("./components/Charts/Nvd3/Nvd3"))
//charts
//pages
const SignUp = React.lazy(() =>
  import("./components/Pages/Authentication/SignUp/SignUp")
);
const SignIn = React.lazy(() =>
  import("./components/Pages/Authentication/SignIn/SignIn")
);
const ForgotPassword = React.lazy(() =>
  import("./components/Pages/Authentication/ForgotPassword/ForgotPassword")
);
const Lockscreen = React.lazy(() =>
  import("./components/Pages/Authentication/Lockscreen/Lockscreen")
);
const ResetPassword = React.lazy(() =>
  import("./components/Pages/Authentication/ResetPassword/ResetPassword")
);
const UnderConstruction = React.lazy(() =>
  import(
    "./components/Pages/Authentication/UnderConstruction/UnderConstruction"
  )
);
const Error404 = React.lazy(() =>
  import("./components/Pages/Authentication/404Error/404Error")
);
const Error500 = React.lazy(() =>
  import("./components/Pages/Authentication/500Error/500Error")
);
const Error501 = React.lazy(() =>
  import("./components/Pages/Authentication/501Error/501Error")
);
const Cart = React.lazy(() => import("./components/Pages/Ecommerce/Cart/Cart"));
const Checkout = React.lazy(() =>
  import("./components/Pages/Ecommerce/Check-out/Check-out")
);
const ProductDetails = React.lazy(() =>
  import("./components/Pages/Ecommerce/Product-Details/Product-Details")
);
const Shop = React.lazy(() => import("./components/Pages/Ecommerce/Shop/Shop"));
const Wishlist = React.lazy(() =>
  import("./components/Pages/Ecommerce/Wish-list/Wish-list")
);
const EmptyPage = React.lazy(() =>
  import("./components/Pages/EmptyPage/EmptyPage")
);
const Faqs = React.lazy(() => import("./components/Pages/Faqs/Faqs"));
const Gallery = React.lazy(() => import("./components/Pages/Gallery/Gallery"));
const Invoice = React.lazy(() => import("./components/Pages/Invoice/Invoice"));
const Chat = React.lazy(() => import("./components/Pages/Mail/Chat/Chat"));
const Mail = React.lazy(() => import("./components/Pages/Mail/Mail/Mail"));
const Mailsettings = React.lazy(() =>
  import("./components/Pages/Mail/Mail-settings/Mail-settings")
);
const MailCompose = React.lazy(() =>
  import("./components/Pages/Mail/MailCompose/MailCompose")
);
const Readmail = React.lazy(() =>
  import("./components/Pages/Mail/Read-mail/Read-mail")
);
const Notificationslist = React.lazy(() =>
  import("./components/Pages/Notifications-list/Notifications-list")
);
const Pricing = React.lazy(() => import("./components/Pages/Pricing/Pricing"));
const Settings = React.lazy(() =>
  import("./components/Pages/Settings/Settings")
);
const Todotask = React.lazy(() =>
  import("./components/Pages/Todotask/Todotask")
);
const Aboutus = React.lazy(() => import("./components/Pages/Aboutus/Aboutus"));
const Profile = React.lazy(() => import("./components/Pages/Profile/Profile"));

//pages
//Utilities
const Extras = React.lazy(() => import("./components/Utilities/Extras/Extras"));
const Background = React.lazy(() => import("./components/Utilities/Background/Background"));
const Border = React.lazy(() => import("./components/Utilities/Border/Border"));
const Display = React.lazy(() => import("./components/Utilities/Display/Display"));
const Width = React.lazy(() => import("./components/Utilities/Width/Width"));
const Position = React.lazy(() => import("./components/Utilities/Position/Position"));
const Padding = React.lazy(() => import("./components/Utilities/Padding/Padding"));
const Margin = React.lazy(() => import("./components/Utilities/Margin/Margin"));
const Flex = React.lazy(() => import("./components/Utilities/Flex/Flex"));
const Height = React.lazy(() => import("./components/Utilities/Height/Height"));


//Utilities end
//Icons
const FontAwesome = React.lazy(() =>
  import("./components/Icons/FontAwesome/FontAwesome")
);
const MaterialIcons = React.lazy(() =>
  import("./components/Icons/MaterialIcons/MaterialIcons")
);
const MaterialDesignIcons = React.lazy(() =>
  import("./components/Icons/MaterialDesignIcons/MaterialDesignIcons")
);
const IonicIcons = React.lazy(() =>
  import("./components/Icons/IonicIcons/IonicIcons")
);
const Pe7Icons = React.lazy(() =>
  import("./components/Icons/Pe7Icons/Pe7Icons")
);
const SimpleLineIcons = React.lazy(() =>
  import("./components/Icons/SimpleLineIcons/SimpleLineIcons")
);
const ThemifyIcons = React.lazy(() =>
  import("./components/Icons/ThemifyIcons/ThemifyIcons")
);
const TypiconsIcons = React.lazy(() =>
  import("./components/Icons/TypiconsIcons/TypiconsIcons")
);
const WeatherIcons = React.lazy(() =>
  import("./components/Icons/WeatherIcons/WeatherIcons")
);
const BootstrapIcons = React.lazy(() =>
  import("./components/Icons/BootstrapIcons/BootstrapIcons")
);
const FeatherIcons = React.lazy(() =>
  import("./components/Icons/FeatherIcons/FeatherIcons")
);
const FlagIcons = React.lazy(() =>
  import("./components/Icons/FlagIcons/FlagIcons")
);
//Icons end
//Form
const FormElements = React.lazy(() =>
  import("./components/Forms/FormElements/FormElements")
);
const FormEditor = React.lazy(() =>
  import("./components/Forms/FormEditor/FormEditor")
);
const Formelementsizes = React.lazy(() =>
  import("./components/Forms/Form-element-sizes/Form-element-sizes")
);
const FormLayouts = React.lazy(() =>
  import("./components/Forms/FormLayouts/FormLayouts")
);
const FormInputSpinners = React.lazy(() =>
  import("./components/Forms/FormInputSpinners/FormInputSpinners")
);
const FormValidation = React.lazy(() =>
  import("./components/Forms/FormValidation/FormValidation")
);
const FormWizard = React.lazy(() =>
  import("./components/Forms/FormWizard/FormWizard")
);
const AdvancedForms = React.lazy(() =>
  import("./components/Forms/AdvancedForms/AdvancedForms")
);
const LeafletMaps = React.lazy(() =>
  import("./components/Maps/LeafletMaps/LeafletMaps")
);
const VectorMaps = React.lazy(() =>
  import("./components/Maps/VectorMaps/VectorMaps")
);
const DefaultTables = React.lazy(() =>
  import("./components/Tables/DefaultTables/DefaultTables")
);
const DataTables = React.lazy(() =>
  import("./components/Tables/DataTables/DataTables")
);
const AuthLogin = React.lazy(() => import("./Authentication/Login"));
const AuthSignup = React.lazy(() => import("./Authentication/Signup"))
//Form
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
    <HashRouter>
      <React.Suspense fallback={<Loader/>}>
        <Routes>
          <Route path={`/`} element={<Auth />}>
            <Route index element={<AuthLogin />} />
            
            <Route
              path={`${process.env.PUBLIC_URL}/authentication/login`}
              element={<AuthLogin />}
            />
              <Route
              path={`${process.env.PUBLIC_URL}/authentication/signup`}
              element={<AuthSignup />}
            />
            </Route>
            
          <Route path={`/`} element={<App />}>
            
            <Route
              path={`${process.env.PUBLIC_URL}/widgets`}
              element={<Widgets />}
            />
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/dashboard/dashboard-1`}
                element={<Dashboard />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/dashboard/dashboard-2`}
                element={<Dashboard2 />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/dashboard/dashboard-3`}
                element={<Dashboard3 />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/app/ABMManagement`}
                element={<ABMManagement />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/ABMRegistration`}
                element={<ABMRegistration />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/CreateABMManagement`}
                element={<CreateABMManagement />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/Zonal`}
                element={<Zonal />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/ZonalHeadRegistration`}
                element={<ZonalHeadRegistration />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/ZonalHeadprofileCreate`}
                element={<ZonalHeadprofileCreate />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/CreateTermsAndConditions`}
                element={<CreateTermsAndConditions />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/TremsAndConditions`}
                element={<TremsAndConditions />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/UpdateTermsAndConditions`}
                element={<UpdateTermsAndConditions />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/MHManagement`}
                element={<MHManagement />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/MHProfileCreation`}
                element={<MHProfileCreation />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/MHRegistration`}
                element={<MHRegistration />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/Finance`}
                element={<Finance />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/FinanceHeadProfileCreate`}
                element={<FinanceHeadProfileCreate />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/FinanceHeadRegistration`}
                element={<FinanceHeadRegistration />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/Doctor`}
                element={<Doctor />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/Stockist`}
                element={<Stockist />}
              />              <Route
              path={`${process.env.PUBLIC_URL}/app/AddStockist`}
              element={<AddStockist />}
            />
              <Route
                path={`${process.env.PUBLIC_URL}/app/Products`}
                element={<Products />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/AddProduct`}
                element={<AddProduct />}
              />
                                          <Route
                path={`${process.env.PUBLIC_URL}/app/UpdateProduct`}
                element={<UpdateProduct />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/TBMRegistration`}
                element={<TBMRegistration />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/TBMManagement`}
                element={<TBMManagement />}
              />
                                          <Route
                path={`${process.env.PUBLIC_URL}/app/CreateTBMManagement`}
                element={<CreateTBMManagement />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/Clinical`}
                element={<Clinical />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/ClinicalProfileCreate`}
                element={<ClinicalProfileCreate />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/ClinicalRegistration`}
                element={<ClinicalRegistration />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/Sales`}
                element={<Sales />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/SalesHeadRegistration`}
                element={<SalesHeadRegistration />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/SalesProfileCreate`}
                element={<SalesProfileCreate />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/CreateHelpAndSupport`}
                element={<CreateHelpAndSupport />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/UpdateHelpAndSupport`}
                element={<UpdateHelpAndSupport />}
              />
                            <Route
                path={`${process.env.PUBLIC_URL}/app/HelpAndSupport`}
                element={<HelpAndSupport />}
              />
                                          <Route
                path={`${process.env.PUBLIC_URL}/app/Privacy`}
                element={<Privacy />}
              />
                                          <Route
                path={`${process.env.PUBLIC_URL}/app/CreatePrivacy`}
                element={<CreatePrivacy />}
              />
                                          <Route
                path={`${process.env.PUBLIC_URL}/app/UpdatePrivacy`}
                element={<UpdatePrivacy />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/elements/alerts`}
                element={<Alerts />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/avatar`}
                element={<Avatar />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/breadcrumbs`}
                element={<Breadcrumbs />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/buttons`}
                element={<Buttons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/images`}
                element={<Images />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/badges`}
                element={<Badges />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/dropdown`}
                element={<Dropdowns />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/thumbnails`}
                element={<Thumbnails />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/listgroup`}
                element={<ListGroups />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/navigation`}
                element={<Navigation />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/pagination`}
                element={<Pagination />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/popover`}
                element={<Popover />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/mediaObject`}
                element={<Mediaobject />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/progress`}
                element={<Progress />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/spinners`}
                element={<Spinners />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/typography`}
                element={<Typography />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/tooltip`}
                element={<Tooltip />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/toast`}
                element={<Toast />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/tags`}
                element={<Tags />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/tabs`}
                element={<Tabs />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/accordions`}
                element={<Accordions />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/carousel`}
                element={<Carousel />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/collapse`}
                element={<Collapse />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/modal`}
                element={<Modals />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/timeline`}
                element={<Timeline />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/sweetalert`}
                element={<Sweetalert />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/rating`}
                element={<Rating />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/counters`}
                element={<Counters />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/blog`}
                element={<Blog />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/userlist`}
                element={<Userlist />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/search`}
                element={<Search />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/blogdetails`}
                element={<Blogdetails />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/editPost`}
                element={<EditPost />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/fileattachments`}
                element={<Fileattachments />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/aboutus`}
                element={<Aboutus />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/profile`}
                element={<Profile />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/notificationlist`}
                element={<Notificationslist />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/settings`}
                element={<Settings />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/pricing`}
                element={<Pricing />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/todotask`}
                element={<Todotask />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/faqs`}
                element={<Faqs />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/gallery`}
                element={<Gallery />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/invoice`}
                element={<Invoice />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/emptypage`}
                element={<EmptyPage />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/shop`}
                element={<Shop />}
              />
              <Route path={`${process.env.PUBLIC_URL}/pages/e-commerce/productDetails/:id`} element={<ProductDetails />} />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/productDetails`}
                element={<ProductDetails />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/cart`}
                element={<Cart />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/checkout`}
                element={<Checkout />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/wishlist`}
                element={<Wishlist />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/mail`}
                element={<Mail />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/mailcompose`}
                element={<MailCompose />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/readmail`}
                element={<Readmail />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/mailsettings`}
                element={<Mailsettings />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/chat`}
                element={<Chat />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/icon/fontAwesome`}
                element={<FontAwesome />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/materialIcons`}
                element={<MaterialIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/materialDesignIcons`}
                element={<MaterialDesignIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/ionicIcons`}
                element={<IonicIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/typiconsIcons`}
                element={<TypiconsIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/weatherIcons`}
                element={<WeatherIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/featherIcons`}
                element={<FeatherIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/flagIcons`}
                element={<FlagIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/pe7Icons`}
                element={<Pe7Icons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/simpleLineIcons`}
                element={<SimpleLineIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/themifyIcons`}
                element={<ThemifyIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/bootstrapIcons`}
                element={<BootstrapIcons />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/form/formElements`}
                element={<FormElements />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/advancedform`}
                element={<AdvancedForms />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formlayouts`}
                element={<FormLayouts />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formValidation`}
                element={<FormValidation />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formWizard`}
                element={<FormWizard />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formEditor`}
                element={<FormEditor />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formelementsizes`}
                element={<Formelementsizes />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/forminputspinners`}
                element={<FormInputSpinners />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/maps/leafletMaps`}
                element={<LeafletMaps />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/maps/vectorMaps`}
                element={<VectorMaps />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/tables/defaultTables`}
                element={<DefaultTables />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/tables/dataTables`}
                element={<DataTables />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/charts/chartJs`}
                element={<ChartJS />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/charts/echart`}
                element={<Echart />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/charts/nvd3Charts`}
                element={<Nvd3Charts />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/charts/apexcharts`}
                element={<Apexcharts />}
              />
            </Route>
            <Route>
              <Route>
                <Route
                  path={`${process.env.PUBLIC_URL}/utilities/background`}
                  element={<Background />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/border`}
                  element={<Border />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/display`}
                  element={<Display />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/flex`}
                  element={<Flex />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/height`}
                  element={<Height />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/margin`}
                  element={<Margin />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/padding`}
                  element={<Padding />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/position`}
                  element={<Position />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/width`}
                  element={<Width />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/extras`}
                  element={<Extras />}
                />
              </Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/501error`}
                element={<Error501 />}
              />
            </Route>
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Custompages />}>
            <Route
              path={`${process.env.PUBLIC_URL}/pages/Authentication/sigin`}
              element={<SignIn />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/pages/Authentication/sigup`}
              element={<SignUp />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/pages/Authentication/forgotpassword`}
              element={<ForgotPassword />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/pages/Authentication/resetpassword`}
              element={<ResetPassword />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/pages/Authentication/lockscreen`}
              element={<Lockscreen />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/pages/Authentication/underconstruction`}
              element={<UnderConstruction />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/pages/Authentication/404error`}
              element={<Error404 />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/pages/Authentication/500error`}
              element={<Error500 />}
            />
            <Route path="*" element={<Error404 />} />
          </Route>
          
          <Route>
            <Route
              path={`${process.env.PUBLIC_URL}/pages/switcher/switcher-1`}
              element={<Switcherapp />}
            />
          </Route>
          <Route></Route>
        </Routes>
      </React.Suspense>
    </HashRouter>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
