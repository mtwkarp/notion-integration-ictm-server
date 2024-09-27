(()=>{"use strict";var e={443:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Types=void 0,t.Types={CourseInstructorsUpdateService:Symbol.for("CourseInstructorsUpdateService"),SchedulePublishService:Symbol.for("SchedulePublishService"),CourseInstructorsUpdateController:Symbol.for("CourseInstructorsUpdateController"),SchedulePublishController:Symbol.for("SchedulePublishController"),UsersCollection:Symbol.for("UsersCollection"),UsersOccupationCollection:Symbol.for("UsersOccupationCollection"),UsersScheduleCollection:Symbol.for("UsersScheduleCollection"),Database:Symbol.for("Database"),NotionClient:Symbol.for("DefaultNotionClient"),CoursesScheduleNDB:Symbol.for("CoursesScheduleNotionDatabase"),CoursesScheduleNDBEditWatcher:Symbol.for("CoursesScheduleDatabaseNotionEditWatcher"),InstructorsPersonalAvailabilityNDB:Symbol.for("InstructorsPersonalAvailabilityNotionDatabase"),InstructorsNDB:Symbol.for("InstructorsNotionDatabase"),InstructorsAvailabilityNDB:Symbol.for("InstructorsAvailabilityNotionDatabase"),NotionCoursePage:Symbol.for("NotionCoursePage"),NotionUsersData:Symbol.for("NotionUsersInfo")}},3069:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.controllersModule=void 0;const s=r(5337),a=r(443),n=o(r(2760)),i=o(r(5094));t.controllersModule=new s.ContainerModule((e=>{e(a.Types.CourseInstructorsUpdateController).to(n.default),e(a.Types.SchedulePublishController).to(i.default)}))},4136:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.collectionsModule=void 0;const s=r(5337),a=r(443),n=o(r(2060)),i=o(r(6898)),c=o(r(7505));t.collectionsModule=new s.ContainerModule((e=>{e(a.Types.UsersCollection).to(c.default),e(a.Types.UsersOccupationCollection).to(i.default),e(a.Types.UsersScheduleCollection).to(n.default)}))},848:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.databaseModule=void 0;const s=r(5337),a=r(443),n=o(r(4170));t.databaseModule=new s.ContainerModule((e=>{e(a.Types.Database).to(n.default)}))},8854:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(5337),s=r(1551),a=r(3069),n=r(848),i=r(7623),c=r(2542),l=r(4754),u=r(9558),d=r(4136),f=new o.Container;f.load(s.servicesModule,a.controllersModule,d.collectionsModule,n.databaseModule,i.clientModule,u.ndbModule,c.pagesModule,l.usersModule),t.default=f},7623:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.clientModule=void 0;const o=r(5337);t.clientModule=new o.ContainerModule((e=>{}))},9558:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ndbModule=void 0;const s=r(5337),a=r(443),n=o(r(6088)),i=o(r(6440)),c=o(r(8706)),l=o(r(9876)),u=o(r(9349));t.ndbModule=new s.ContainerModule((e=>{e(a.Types.CoursesScheduleNDB).to(n.default),e(a.Types.CoursesScheduleNDBEditWatcher).to(i.default),e(a.Types.InstructorsPersonalAvailabilityNDB).to(c.default),e(a.Types.InstructorsNDB).to(l.default),e(a.Types.InstructorsAvailabilityNDB).to(u.default)}))},2542:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.pagesModule=void 0;const s=r(5337),a=r(443),n=o(r(875));t.pagesModule=new s.ContainerModule((e=>{e(a.Types.NotionCoursePage).to(n.default)}))},4754:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.usersModule=void 0;const s=r(5337),a=r(443),n=o(r(9380));t.usersModule=new s.ContainerModule((e=>{e(a.Types.NotionUsersData).to(n.default)}))},1551:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.servicesModule=void 0;const s=r(5337),a=r(443),n=o(r(4426)),i=o(r(5600));t.servicesModule=new s.ContainerModule((e=>{e(a.Types.CourseInstructorsUpdateService).to(n.default),e(a.Types.SchedulePublishService).to(i.default)}))},9205:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0,t.config={port:process.env.PORT||3e3}},2026:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});const n=r(5337),i=r(1343);let c=class{constructor(e){this.service=e,this.handleRequest=this.handleRequest.bind(this)}handleRequest(e,t){const r=e.body,o=this.service.handleRequest(r);t.status(200).json(o)}};c=s([(0,n.injectable)(),a("design:paramtypes",["function"==typeof(o=void 0!==i.IService&&i.IService)?o:Object])],c),t.default=c},2760:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=r(5337),l=i(r(2026)),u=r(1343),d=r(443);let f=class extends l.default{constructor(e){super(e)}};f=s([(0,c.injectable)(),n(0,(0,c.inject)(d.Types.CourseInstructorsUpdateService)),a("design:paramtypes",["function"==typeof(o=void 0!==u.IService&&u.IService)?o:Object])],f),t.default=f},5094:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=r(5337),l=i(r(2026)),u=r(1343),d=r(443);let f=class extends l.default{constructor(e){super(e)}};f=s([(0,c.injectable)(),n(0,(0,c.inject)(d.Types.SchedulePublishService)),a("design:paramtypes",["function"==typeof(o=void 0!==u.IService&&u.IService)?o:Object])],f),t.default=f},4170:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};Object.defineProperty(t,"__esModule",{value:!0});const a=r(6253),n=r(5337);let i=o=class{init(){const e={apiKey:process.env.FIREBASE_API_KEY,authDomain:process.env.FIREBASE_AUTH_DOMAIN,databaseURL:process.env.FIREBASE_DATABASE_URL,projectId:process.env.FIREBASE_PROJECT_ID,storageBucket:process.env.FIREBASE_STORAGE_BUCKET,messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,appId:process.env.FIREBASE_APP_ID};o.App=(0,a.initializeApp)(e)}getDatabase(){if(void 0===o.App)throw new Error("Database not initialized. You need to initialize database first.");return o.App}};i=o=s([(0,n.injectable)()],i),t.default=i},884:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};Object.defineProperty(t,"__esModule",{value:!0});const s=r(5337);let a=class{};a=o([(0,s.injectable)()],a),t.default=a},7505:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=r(9171),l=r(5337),u=i(r(884)),d=i(r(4170)),f=r(6557),h=r(1370),p=r(443),y=i(r(5061));let _=class extends u.default{constructor(e){super(),this.collectionName=f.DBCollectionNames.USERS,this.notionClient=new y.default,this.instructorsNDB=e,this.db=(0,c.getFirestore)((new d.default).getDatabase()),this.collectionRef=(0,c.collection)(this.db,this.collectionName)}async getUsersNamesById(){const e=(await(0,c.getDocs)(this.collectionRef)).docs.find((e=>"names"===e.id));if(e)return e.data();throw new Error('Document with ID "names" not found.')}async setUsersNamesById(){const e=(await this.notionClient.users.list()).results.filter((e=>"person"===e.type)),t={};for(let r=0;r<e.length;r++){const o=e[r].id,s=await this.instructorsNDB.getInstructorNameByUserId(o);t[o]=s}const r=(0,c.doc)(this.db,this.collectionName,"names");await(0,c.updateDoc)(r,t)}};_=s([(0,l.injectable)(),n(0,(0,l.inject)(p.Types.InstructorsNDB)),a("design:paramtypes",["function"==typeof(o=void 0!==h.IInstructorsNDB&&h.IInstructorsNDB)?o:Object])],_),t.default=_},6898:function(e,t,r){var o,s,a=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},n=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},i=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}},c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=r(9171),u=r(5337),d=c(r(884)),f=r(6557),h=c(r(4170)),p=r(373),y=r(2723),_=r(443);let b=class extends d.default{constructor(e,t){super(),this.collectionName=f.DBCollectionNames.SCHEDULE,this.scheduleNDBEditWatcher=e,this.coursesScheduleNDB=t,this.db=(0,l.getFirestore)((new h.default).getDatabase()),this.collectionRef=(0,l.collection)(this.db,this.collectionName)}startWatchForScheduleDatabasesUpdate(){this.scheduleNDBEditWatcher.runWatchInterval(),this.scheduleNDBEditWatcher.subscribeObserver(this.onDatabaseEdit,this)}async onDatabaseEdit(){await this.setOccupiedInstructors()}async setOccupiedInstructors(){const e=await this.coursesScheduleNDB.getOccupiedInstructorDates(),t=(0,l.doc)(this.db,this.collectionName,f.DBDocumentNames.OCCUPATION);await(0,l.updateDoc)(t,e)}async getUsersOccupiedDates(){const e=await(0,l.getDocs)(this.collectionRef);let t={};return e.forEach((e=>{e.id===f.DBDocumentNames.OCCUPATION&&(t=e.data())})),t}};b=a([(0,u.injectable)(),i(0,(0,u.inject)(_.Types.CoursesScheduleNDBEditWatcher)),i(1,(0,u.inject)(_.Types.CoursesScheduleNDB)),n("design:paramtypes",["function"==typeof(o=void 0!==p.INDBEditWatcher&&p.INDBEditWatcher)?o:Object,"function"==typeof(s=void 0!==y.ICoursesScheduleNDB&&y.ICoursesScheduleNDB)?s:Object])],b),t.default=b},2060:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},s=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(9171),i=r(5337),c=a(r(884)),l=a(r(4170)),u=r(6557);let d=class extends c.default{constructor(){super(),this.collectionName=u.DBCollectionNames.SCHEDULE,this.db=(0,n.getFirestore)((new l.default).getDatabase()),this.collectionRef=(0,n.collection)(this.db,this.collectionName)}async getRawUsersSchedule(){const e=await(0,n.getDocs)(this.collectionRef);let t={};return e.forEach((e=>{"availability"===e.id&&(t=e.data())})),t}async setUserSchedule(e,t){const r=(0,n.doc)(this.db,this.collectionName,"availability");await(0,n.updateDoc)(r,{[e]:t})}};d=o([(0,i.injectable)(),s("design:paramtypes",[])],d),t.default=d},6557:(e,t)=>{var r,o;Object.defineProperty(t,"__esModule",{value:!0}),t.DBDocumentNames=t.DBCollectionNames=void 0,(o=t.DBCollectionNames||(t.DBCollectionNames={})).SCHEDULE="schedule",o.USERS="users",(r=t.DBDocumentNames||(t.DBDocumentNames={})).OCCUPATION="occupation",r.AVAILABILITY="availability"},8787:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},1440:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(818));r(1321);const a=r(443),n=o(r(8854));s.default.config(),n.default.get(a.Types.Database).init(),r(6209)},8904:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},s=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});const a=r(8496),n=r(5337);let i=class extends a.Client{constructor(){super({auth:process.env.NOTION_KEY})}};i=o([(0,n.injectable)(),s("design:paramtypes",[])],i),t.default=i},5061:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(5337),n=s(r(8904));let i=class extends n.default{};i=o([(0,a.injectable)()],i),t.default=i},7215:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(5337),c=r(5542),l=n(r(5061));let u=class{constructor(e){this.notionClient=new l.default,e&&(this.databaseId=e)}get id(){return this.databaseId}async queryDatabase(){try{return await this.notionClient.databases.query({database_id:this.databaseId})}catch(e){throw new Error(`Something went wrong while trying to queryDatabase - ${e}, database id - ${this.databaseId}`)}}async getDatabaseResults(){return(await this.queryDatabase()).results}};u=s([(0,i.injectable)(),a("design:paramtypes",["function"==typeof(o=void 0!==c.NotionDatabaseId&&c.NotionDatabaseId)?o:Object])],u),t.default=u},6088:function(e,t,r){var o,s,a=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},n=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},i=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}},c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=r(5337),u=c(r(7215)),d=c(r(875)),f=r(8787),h=r(8739),p=r(3129),y=r(443);let _=class extends u.default{constructor(e,t){super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID),this.userScheduleCollection=e,this.notionUsersInfo=t}async getCurrentCourses(){const e=await this.getDatabaseResults(),t=new Date((0,h.getFormatedKyivDate)());return e.filter((e=>{const r=e.properties["Дата"];return!!(r&&r.date&&r.date.start)&&new Date(r.date.start)>=t}))}async getAvailableUsersByDates(){const e=await this.userScheduleCollection.getRawUsersSchedule(),t=await this.notionUsersInfo.getAllUsersWithPersonTypeNamesById(),r={};for(const o in e){const s=e[o];for(let e=0;e<s.length;e++){const a=s[e],n=t[o];n&&(r[a]?r[a].push(n):r[a]=[n])}}return r}async updateAvailableUsersOnCoursePages(){const e=await this.getCurrentCourses(),t=await this.getAvailableUsersByDates();for(let r=0;r<e.length;r++){const o=e[r].id,s=new d.default(o),a=await s.getCourseDate();if(!a){console.warn(`No course date found, course page id - ${o}`);continue}const n=t[a]||[];await s.fillAvailableInstructorsProperty(n)}}async getOccupiedInstructorDates(){const e=await this.getCurrentCourses(),t={};for(let r=0;r<e.length;r++){const o=e[r],s=o.properties["Дата"],a=o.properties["Інструктори"].people;if(s&&s.date&&s.date.start)for(let e=0;e<a.length;e++){const r=a[e];t[r.id]||(t[r.id]=[]),t[r.id].push(s.date.start)}}return t}};_=a([(0,l.injectable)(),i(0,(0,l.inject)(y.Types.UsersScheduleCollection)),i(1,(0,l.inject)(y.Types.NotionUsersData)),n("design:paramtypes",["function"==typeof(o=void 0!==f.IUsersScheduleCollection&&f.IUsersScheduleCollection)?o:Object,"function"==typeof(s=void 0!==p.INotionUsersData&&p.INotionUsersData)?s:Object])],_),t.default=_},2723:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},5125:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(5337),n=s(r(7215));let i=class extends n.default{constructor(){super(...arguments),this.observers=[],this.isIntervalActive=!1,this.mostRecentDatabaseEditTime="",this.lastEditedPageId=""}runWatchInterval(){this.isIntervalActive?console.warn("The interval already active"):(this.watchInterval=setInterval(this.checkForEdits.bind(this),1e3),this.isIntervalActive=!0)}getLastEditedPageId(){return this.lastEditedPageId}stopWatchInterval(){this.isIntervalActive?(clearInterval(this.watchInterval),this.isIntervalActive=!1):console.warn("The interval in not active")}async checkForEdits(){const e=this.mostRecentDatabaseEditTime;await this.setLastEditedPageIdAndTimestamp(),e!==this.mostRecentDatabaseEditTime&&this.onRecentEdit()}async setLastEditedPageIdAndTimestamp(){const e=await this.getDatabaseResults(),t=e.map((e=>new Date(e.last_edited_time)));if(!t.length)return;const r=new Date(Math.max.apply(null,t.map((e=>e.getTime())))).toISOString();r!==this.mostRecentDatabaseEditTime&&(this.mostRecentDatabaseEditTime=r,this.lastEditedPageId=e.find((e=>e.last_edited_time===r))?.id||"")}onRecentEdit(){this.notifyObservers()}subscribeObserver(e,t){this.observers.push({cb:e,context:t})}unsubscribeObserver(e,t){this.observers.filter((r=>r.cb===e&&r.context===t)).forEach((e=>{this.observers.splice(this.observers.indexOf(e),1)}))}notifyObservers(){this.observers.forEach((e=>{e.cb.apply(e.context,[this.lastEditedPageId])}))}};i=o([(0,a.injectable)()],i),t.default=i},6440:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=r(5337),l=i(r(5125)),u=r(2723),d=r(443);let f=class extends l.default{constructor(e){super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID),this.lastDatabaseAssignedInstructors="",this.coursesScheduleNDB=e}async setLastDatabaseAssignedInstructors(){this.lastDatabaseAssignedInstructors=await this.getAssignedInstructorsJoin()}async getAssignedInstructorsJoin(){const e=await this.coursesScheduleNDB.getCurrentCourses(),t=[];for(let r=0;r<e.length;r++){const o=e[r].properties["Інструктори"].people;for(let e=0;e<o.length;e++)t.push(o[e].id)}return t.join("")}async checkForEdits(){const e=await this.getAssignedInstructorsJoin();this.lastDatabaseAssignedInstructors!==e&&(await this.setLastDatabaseAssignedInstructors(),this.onRecentEdit())}};f=s([(0,c.injectable)(),n(0,(0,c.inject)(d.Types.CoursesScheduleNDB)),a("design:paramtypes",["function"==typeof(o=void 0!==u.ICoursesScheduleNDB&&u.ICoursesScheduleNDB)?o:Object])],f),t.default=f},373:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},8706:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(5337),n=s(r(7215)),i=r(8739);let c=class extends n.default{async getInstructorAvailableDates(){const e=(await this.queryDatabase()).results,t=[];for(let r=0;r<e.length;r++){const o=e[r];this.checkIfPageDatePagePropertyIsCorrect(o)&&t.push(o.properties["Дата"].date.start)}const r=(0,i.filterDatesBeforeTargetDate)(t,(0,i.getFormatedKyivDate)());return Array.from(new Set(r))}checkIfPageDatePagePropertyIsCorrect(e){return void 0===e.properties["Дата"]?(console.error(`No property with name Дата was found in database with id - ${this.databaseId}. Page url - ${e.url}`),!1):e.properties["Дата"].date?null!==e.properties["Дата"].date.start||(console.error(`No start date was found in database with id - ${this.databaseId}. Page url - ${e.url}`),!1):(console.error(`No date object was found in database with id - ${this.databaseId}. Page url - ${e.url}`),!1)}};c=o([(0,a.injectable)()],c),t.default=c},9876:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},s=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(5337),i=a(r(7215)),c=r(3437),l=a(r(8706)),u=a(r(9957));let d=class extends i.default{constructor(){super(process.env.NOTION_INSTRUCTORS_DATABASE_ID)}async getInstructorPage(e){try{return await this.notionClient.pages.retrieve({page_id:e})}catch(t){throw new Error(`Something went wrong during retrieving instructor page: ${t}. Instructor page id - ${e}`)}}async getInstructorPageBlocks(e){try{return await this.notionClient.blocks.children.list({block_id:e})}catch(t){throw new Error(`Something went wrong during retrieving instructor page blocks: ${t}. Instructor page id - ${e}`)}}async getInstructorAvailabilityDatabase(e){const t=(await this.getInstructorPageBlocks(e)).results;for(let e=0;e<t.length;e++){const r=t[e];if("child_database"===r.type&&r.child_database.title===c.NotionDatabaseTitles.INSTRUCTOR_AVAILABILITY)return new l.default(r.id)}throw new Error(`No availability database found at this instructor page id - ${e}.`)}async getAllInstructorsAvailabilityDatabases(){const e=await this.queryDatabase(),t=[];for(let r=0;r<e.results.length;r++){const o=e.results[r].id,s=await this.getInstructorAvailabilityDatabase(o);t.push(s)}return t}async getInstructorAvailableDatesByUserId(e){return(await this.getInstructorAvailabilityDatabaseByUserId(e)).getInstructorAvailableDates()}async getInstructorAvailabilityDatabaseByUserId(e){const{id:t}=await this.getInstructorPageByUserId(e);return this.getInstructorAvailabilityDatabase(t)}async getInstructorPageByUserId(e){const t=await this.getDatabaseResults();for(let r=0;r<t.length;r++){const{properties:o}=t[r];if(o&&o.Person){const s=o.Person;if(s.people.length&&e===new u.default(s.people[0]).getUserId())return t[r]}}throw new Error(`No such instructor page id - ${e}`)}async getInstructorNameByUserId(e){const t=(await this.getInstructorPageByUserId(e)).properties["Прізвище та Імʼя"];if(!t)throw new Error(`No instructor name property specified, user id - ${e}`);return t.rich_text[0].text.content}};d=o([(0,n.injectable)(),s("design:paramtypes",[])],d),t.default=d},9349:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=r(5337),l=i(r(7215)),u=r(1370),d=r(443);let f=class extends l.default{constructor(e){super(process.env.NOTION_AVAILABLE_INSTRUCTORS_DATES_DATABASE_ID),this.instructorsNDB=e}async fillInstructorAvailableDates(e){const t=await this.instructorsNDB.getInstructorAvailableDatesByUserId(e),r=await this.instructorsNDB.getInstructorNameByUserId(e),o=[];t.forEach((e=>{const t=this.createPageSchemaFromAvailableDate(e,r);o.push(this.createAvailabilityPage(t))}));try{await Promise.all(o),console.log(`Instructor availability pages created successfully. Instructor name - ${r}`)}catch(e){console.error("Error creating pages:",e)}}async createAvailabilityPage(e){return this.notionClient.pages.create(e)}createPageSchemaFromAvailableDate(e,t){return{parent:{database_id:process.env.NOTION_AVAILABLE_INSTRUCTORS_DATES_DATABASE_ID},properties:{Дата:{date:{start:e}},Інструктори:{rich_text:[{text:{content:t}}]}}}}async getAvailableInstructorNamesByDate(e){const t=await this.getDatabaseResults();let r,o="";for(let o=0;o<t.length;o++){const s=t[o],a=s.properties["Дата"];if(a){const t=a.date?.start;if(t===e){r=s;break}}}return o=r?r.properties["Інструктори"].rich_text[0].plain_text:"На дану дату ніхто з інструкторів не доступний.",o}};f=s([(0,c.injectable)(),n(0,(0,c.inject)(d.Types.InstructorsNDB)),a("design:paramtypes",["function"==typeof(o=void 0!==u.IInstructorsNDB&&u.IInstructorsNDB)?o:Object])],f),t.default=f},1370:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},9957:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e){this.notionUserObject=e}getUserId(){return this.notionUserObject.id}getEmail(){return this.notionUserObject.person.email}getUserName(){return this.notionUserObject.name}}},3437:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NotionDatabaseTitles=void 0,(t.NotionDatabaseTitles||(t.NotionDatabaseTitles={})).INSTRUCTOR_AVAILABILITY="Таблиця доступності"},5542:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},3935:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(5337),c=r(5542),l=n(r(5061));let u=class{constructor(e){this.notionClient=new l.default,e&&(this.pageId=e)}get id(){return this.pageId}async retrievePage(){try{return await this.notionClient.pages.retrieve({page_id:this.pageId})}catch(e){throw new Error(`Could not retrieve page: ${e}`)}}};u=s([(0,i.injectable)(),a("design:paramtypes",["function"==typeof(o=void 0!==c.NotionDatabaseId&&c.NotionDatabaseId)?o:Object])],u),t.default=u},875:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(3935));class a extends s.default{async fillAvailableInstructorsProperty(e){try{await this.notionClient.pages.update({page_id:this.pageId,properties:{"Доступні інструктори":{rich_text:[{type:"text",text:{content:this.formatInstructorNamesPropertyValue(e)}}]}}}),console.log("Course page updated successfully")}catch(e){throw new Error(`Error updating page: ${e}`)}}formatInstructorNamesPropertyValue(e){let t="";return t=e.length?e.join(""):this.noInstructorsMessage,t}get noInstructorsMessage(){return"Немає доступних інструкторів 😭"}async getCourseDate(){const e=(await this.retrievePage()).properties["Дата"];return e.date?.start}}t.default=a},9380:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(5337),n=s(r(5061));let i=class{constructor(){this.notionClient=new n.default}async getAllUsers(){return(await this.notionClient.users.list({})).results}async getAllUsersWithPersonType(){return(await this.getAllUsers()).filter((({type:e})=>"person"===e))}async getAllUsersWithPersonTypeNamesById(){const e=await this.getAllUsersWithPersonType(),t={};for(let r=0;r<e.length;r++){const{id:o,name:s}=e[r];s?t[o]=s:console.error(`No name found for user with id - ${o}`)}return t}};i=o([(0,a.injectable)()],i),t.default=i},3129:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},5796:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(7252),a=o(r(8854)),n=r(443),i=(0,s.Router)(),c=a.default.get(n.Types.SchedulePublishController),l=a.default.get(n.Types.CourseInstructorsUpdateController);i.post("/scheduleData",c.handleRequest),i.post("/updateCoursesAvailableInstructors",l.handleRequest),t.default=i},6209:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(3268)),a=o(r(7252)),n=o(r(2003)),i=o(r(8577)),c=o(r(5796)),l=r(9205),u=(0,a.default)();u.use("/public",a.default.static(n.default.join(__dirname,"public"))),u.use(a.default.json()),u.use(s.default.json()),u.use((0,i.default)()),u.use("/",c.default),u.use(((e,t,r)=>{console.error(e.stack),r.status(500).send("Something broke!")})),u.listen(l.config.port,(()=>{console.log(`Server is running on port ${l.config.port}`)}))},8356:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};Object.defineProperty(t,"__esModule",{value:!0});const s=r(5337);let a=class{handleRequest(e){return{message:"Request received successfully",receivedData:e}}};a=o([(0,s.injectable)()],a),t.default=a},4426:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=r(5337),l=i(r(8356)),u=r(2723),d=r(443);let f=class extends l.default{constructor(e){super(),this.coursesScheduleNDB=e}handleRequest(e){return console.log("update available instructors request received"),this.coursesScheduleNDB.updateAvailableUsersOnCoursePages().then((()=>console.log("All available users for courses updated"))).catch((e=>console.log(e))),{message:"Request received successfully",receivedData:e}}};f=s([(0,c.injectable)(),n(0,(0,c.inject)(d.Types.CoursesScheduleNDB)),a("design:paramtypes",["function"==typeof(o=void 0!==u.ICoursesScheduleNDB&&u.ICoursesScheduleNDB)?o:Object])],f),t.default=f},5600:function(e,t,r){var o,s=this&&this.__decorate||function(e,t,r,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(n=(a<3?s(n):a>3?s(t,r,n):s(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=r(5337),l=i(r(8356)),u=i(r(9876)),d=r(8787),f=r(443);let h=class extends l.default{constructor(e){super(),this.usersScheduleCollection=e}handleRequest(e){return this.saveScheduleData(e.instructorId),{message:"Request received successfully",receivedData:e}}async saveScheduleData(e){const t=new u.default,r=await t.getInstructorAvailableDatesByUserId(e);await this.usersScheduleCollection.setUserSchedule(e,r)}};h=s([(0,c.injectable)(),n(0,(0,c.inject)(f.Types.UsersScheduleCollection)),a("design:paramtypes",["function"==typeof(o=void 0!==d.IUsersScheduleCollection&&d.IUsersScheduleCollection)?o:Object])],h),t.default=h},1343:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},8739:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.filterDatesBeforeTargetDate=t.getFormatedKyivDate=void 0,t.getFormatedKyivDate=function(){const e=new Date,t=new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Kyiv",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(e).reduce(((e,t)=>(e[t.type]=t.value,e)),{});return`${t.year}-${t.month}-${t.day}`},t.filterDatesBeforeTargetDate=function(e,t){const r=new Date(t);return e.filter((e=>new Date(e)>=r))}},8496:e=>{e.exports=require("@notionhq/client")},3268:e=>{e.exports=require("body-parser")},8577:e=>{e.exports=require("cors")},818:e=>{e.exports=require("dotenv")},7252:e=>{e.exports=require("express")},6253:e=>{e.exports=require("firebase/app")},9171:e=>{e.exports=require("firebase/firestore")},5337:e=>{e.exports=require("inversify")},2003:e=>{e.exports=require("path")},1321:e=>{e.exports=require("reflect-metadata")}},t={};!function r(o){var s=t[o];if(void 0!==s)return s.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,r),a.exports}(1440)})();