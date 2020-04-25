import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Input from '../components/Input';
import ButtonF from '../components/Button';
import swal from 'sweetalert';
import RI from '../components/RoundedImages';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import {ajaxCall} from '../scripts/ajaxCall';
import $ from 'jquery';
import FileUpload from '../components/fileUpload';
import ReactCardFlip from 'react-card-flip';

export default class TrainerRegistration extends Component {
    state={
        Email:'',
        Password:'',
        Photo:'',
        FirstName:'',
        LastName:'',
        BDate:'',
        Gender:'',
        PhoneNo1:'',
        PhoneNo2:'',
        AboutMe:'',
        WorkAreas:[],
        PricePerHour:0,
        TrainerLinks:[],
        DataArea:[],
        DataLinks:[],
        DataLang:[],
        DataPop:[],
        DataQual:[],
        TrainerArea:[],
        TrainerLang:[],
        TrainerQual:[],
        isFlippedQual:false,
        isFlippedLink:false,
        LinkNum:'',
        QualNum:'',
        QualName:'',
        QualDate:'',
        QualPop:'',
        DocPath:'',
        LinkPath:'',
        TrainerCode:''

    }

    componentDidMount() {
        ajaxCall("GET", 'http://proj.ruppin.ac.il/igroup7/proj/api/Area', "", this.successGetAreas, this.errorGetAreas);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Link", "", this.successGetLink, this.errorGetLink);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Language", "", this.successGetLanguage, this.errorGetLanguage);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Population", "", this.successGetPopulation, this.errorGetPopulation);
        ajaxCall("GET", 'http://proj.ruppin.ac.il/igroup7/proj/api/Qualification', "", this.successGetQualification, this.errorGetQualification);
      }


      successGetAreas=(data)=> {
        console.log("im in success");
        this.setState({DataArea:data});
    }

     errorGetAreas=(err)=> {
        console.log(err);
    }

    successGetLink=(data)=>{
        console.log(data);
        this.setState({DataLinks:data});
    }

    errorGetLink=(err)=>{
        console.log(err);
    }

    successGetLanguage=(data)=> {
        this.setState({DataLang:data});
    }

    errorGetLanguage=(err)=> {
        console.log(err);
    }

    successGetPopulation=(data)=> {
        this.setState({DataPop:data});
    }

    errorGetPopulation=(err)=> {
        console.log(err);
    }

    successGetQualification=(data)=> {
        this.setState({DataQual:data});
      }

    errorGetQualification=(err)=> {
        console.log(err);
    }


    validate = ()=>{
        const { Email, Password } = this.state;
        let e = this.validateEmail(Email);
        let p = this.validatePassword(Password);
        let v = this.validateDetails();
        if(!e)
            swal("האימייל שהוזן אינו תקין");
        if(!p)
            swal("אורך הסיסמה חייב להיות 6 תווים לפחות")
        if(e=== true && p=== true  && v===true)
        ajaxCall('Get', 'http://proj.ruppin.ac.il/igroup7/proj/api/User/getUser', "email=" + Email, this.successGetUser, this.errorGetUser);
        
    }

    validateEmail(Email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(Email);
      }

    validatePassword=(Password)=>{
        if (Password.length >=6)
        return true;
        else
        return false;
    }

    validateDetails=()=>
    {
        if(this.state.FirstName ==='')
            {
                swal('הזן שם פרטי');
                return false
            }

        if(this.state.LastName ==='')
        {
            swal('הזן שם משפחה');
            return false
        }
        if(!this.validateDate(this.state.BDate))
        {
            swal('הוזן תאריך לידה לא תקין');
            return false
        }
        // if(this.state.Photo ==='')
        // {
        //     swal('בחר תמונה');
        //     return false
        // }

        if(this.state.Gender ==='')
        {
            swal('בחר מין');
            return false
        }

        if(this.state.PhoneNo1 ==='')
        {
            swal('הזן מספר טלפון');
            return false
        }
        
        // if(this.state.TrainerQual.length<1)
        // {
        //     swal('הזן פרטי הכשרות');
        //     return false
        // }
        // if(this.state.TrainerLang.length<1)
        // {
        //     swal('בחר שפות');
        //     return false
        // }
        // if(this.state.TrainerArea.length<1)
        // {
        //     swal('בחר אזורי עבודה');
        //     return false
        // }

        if(this.state.PricePerHour<=0)
        {
            swal('הזן מחיר לשעה');
            return false
        }
        else return true;

    }

    validateDate=(d)=>{
        let todayDate = new Date().toISOString().substr(0, 10);
        if(d<=todayDate)
        return true;
        else return false;
    }

    successGetUser=(data)=>{
        console.log(data);
        console.log("success");
        if (data.length > 0)
            alert("האימייל כבר קיים במערכת");
        else
            this.SignInTrainer();
    }

    errorGetUser=(err)=>{
        console.log(err);
    }

    SignInTrainer=()=> {
        const {Email, Password, FirstName, LastName, BDate, Gender, PhoneNo1, PhoneNo2, AboutMe, PricePerHour,Photo} = this.state;
        let trainer = {
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            DateOfBirth:BDate,
            Phone1: PhoneNo1,
            Phone2: PhoneNo2,
            Gender: Gender,
            Password: Password,
            AboutMe: AboutMe,
            PricePerHour: PricePerHour,
            Image:Photo
        }
        console.log(trainer);
        ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/Trainer", JSON.stringify(trainer), this.successSignInTrainer, this.errorSignInTrainer);
    }


    successSignInTrainer=(data)=> {
        swal("success");
        console.log(data);
        this.setState({TrainerCode:data.TrainerCode});
        this.setLanguageIntoJson();
        this.setAreasIntoJson();
        ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/TrainerLanguage", JSON.stringify(this.state.TrainerLang), this.successInsertTrainerLanguage, this.errorInsertTrainerLanguage);
        ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/TrainerArea", JSON.stringify(this.state.TrainerArea), this.successInsertTrainerArea, this.errorInsertTrainerArea);
        //ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/TrainerQualification", JSON.stringify(this.state.TrainerArea), this.successInsertTrainerQualification, this.errorInsertTrainerQualification);
        //ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/TrainerLinks", JSON.stringify(this.state.TrainerArea), this.successInsertTrainerLinks, this.errorInsertTrainerLinks);

    }

    errorSignInTrainer=(err)=> {
        console.log(err);
    }

    successInsertTrainerLanguage=(data)=>{
        console.log(data);
    }

    errorInsertTrainerLanguage=(err)=>{
        console.log(err);
    }

    successInsertTrainerArea=(data)=>{
        console.log(data);

    }

    errorInsertTrainerArea=(err)=>{
        console.log(err);
    }

    successInsertTrainerQualification=(data)=>{
        console.log(data);

    }

    errorInsertTrainerQualification=(err)=>{
        console.log(err);
    }

    successInsertTrainerLinks=(data)=>{
        console.log(data);

    }

    errorInsertTrainerLinks=(err)=>{
        console.log(err);
    }


    setLanguageIntoJson=()=>
    {
        let lang=[];
       for(let k in this.state.TrainerLang)
       {
            let trainerLanguage =
            {
                LCode: this.state.TrainerLang[k],
                TrainerCode: this.state.TrainerCode
            }
            lang.push(trainerLanguage);
       }
       this.setState({TrainerLang:lang})
       console.log(this.state.TrainerLang);
        
    }

    setAreasIntoJson=()=>
    {
        let area=[];
       for(let k in this.state.TrainerArea)
       {
            let trainerArea =
            {
                TrainerCode: this.state.TrainerCode,
                AreaCode: this.state.TrainerArea[k]
            }
            area.push(trainerArea);
       }
       this.setState({TrainerArea:area});
       console.log(this.state.TrainerArea);      
    }

    addArea=(Item)=>{
        let newArea = this.state.TrainerArea;
        if(newArea.includes(Item))
        {
            newArea=newArea.filter(item=>item !== Item)
        }
            
        else
        {
            newArea.push(Item);   
        }
        this.setState({TrainerArea:newArea});
        console.log(newArea);
       
    }

    addLanguage=(Item)=>{
        let newLang = this.state.TrainerLang;
        if(newLang.includes(Item))
        {
            newLang=newLang.filter(item=>item !== Item)
        }
            
        else
        {
            newLang.push(Item);   
        }
        this.setState({TrainerLang:newLang});
        console.log(newLang);
       
    }

    addLink=(Item)=>{
        console.log(Item);
        console.log("successLinks")

        let linksTrainer=
        {
            LinkCode:Item,
            TrainerCode:this.state.TrainerCode,
            Link: this.state.link
        }
        console.log(linksTrainer);
        let tLink = this.state.TrainerLinks;
        tLink.push(linksTrainer);
        this.setState({linksTrainer:tLink});
    }

    imageUploaded=(imagePath)=>{
        if(imagePath.includes('jpg' || 'png' || 'jpeg'))
                {
                    console.log('img:'+imagePath);
                    this.setState({Photo:imagePath})
                }
        else
        {
            console.log(imagePath);
            this.setState({DocPath:imagePath}) 
        }
       
    }

    setQual=(qualCode,qualName)=>
    {
        this.setState((prevState) => {
            let qual = prevState.TrainerQual.find(qual => qual.qualCode === qualCode)
            const trainerQual = prevState.TrainerQual.slice(0);

            if(!qual) {
                qual = {
                    TrainerCode: prevState.TrainerCode,
                    qualCode: qualCode,
                    pop: '',
                    documentPath:'',
                    date: new Date()
                };

                trainerQual.push(qual);
            }

            return {
                isFlippedQual: true,
                QualNum: qualCode,
                QualName: qualName,
                QualDate:qual.date,
                QualPop:qual.pop,
                DocPath:qual.documentPath,
                TrainerQual: trainerQual
            };
        });
            console.log(qualName,qualCode);
            console.log(this.state.QualNum);

    }

    confirmQual=()=>{
        this.setState((prevState) => {
            const trainerQual = prevState.TrainerQual.slice(0).filter(qual => qual.qualCode !== prevState.QualNum);
            trainerQual.push({   
                TrainerCode: prevState.TrainerCode,
                qualCode: prevState.QaulNum,
                pop: prevState.QualPopo,
                documentPath: prevState.DocPath,
                date: prevState.QualDate 
            });

            return {
                isFlippedQual: false,
                TrainerQual: trainerQual
            };
        });
        console.log(this.state.TrainerQual);
    }

    // formatDate = (date) => {
    //     if (!(date instanceof Date)) {
    //         return '';
    //      }
    //     return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    // }

    render() {
        const areasList = this.state.DataArea.map(area => <button key={area.AreaCode} onClick={(e)=>this.addArea(area.AreaCode)} style={{margin:'2px', backgroundColor: this.state.TrainerArea.includes(area.AreaCode) ? 'lightblue': ''}} value = {area.AreaCode}>{area.AreaName} </button> ) 
        const linksList = this.state.DataLinks.map(link => <RI key={link.LinkCode} action={(e)=>this.setState({isFlippedLink:true})} image={`images/${link.LinkName}.png`} width="60" height="60" size="8"/>)
        const langList = this.state.DataLang.map(val => <button style={{margin:'2px'}} value = {val.LanCode} key = {val.LanCode} onClick={(e)=>this.addLanguage(val.LanCode)} style={{margin:'2px', backgroundColor: this.state.TrainerLang.includes(val.LanCode) ? 'lightblue': ''}}>{val.LanName} </button> )
        const qualList = this.state.DataQual.map(val => <button style={{margin:'2px'}} value = {val.TypeCode} key = {val.TypeCode} onClick={(c,n)=>this.setQual(val.TypeCode,val.TypeName)}>{val.TypeName} </button> )
        const popList = this.state.DataPop.map(val => <button onClick={(e)=>this.setState({QualPop:val.Code})} style={{margin:'2px', backgroundColor: this.state.QualPop===(val.Code) ? 'lightblue': ''}} value = {val.Code} key = {val.Code}>{val.PName} </button> )
        return (
            <Form id="pForm" style={{textAlign:'right'}} dir="rtl" onSubmit={(e) => e.preventDefault()}>
                <h3>הרשמת מאמן</h3>
                
                <Input setInput={(e)=>this.setState({Email:e.target.value})} title="אימייל" type="text" placeholder="הכנס אימייל" />
                
                <Input setInput={(e)=>this.setState({Password:e.target.value})} title="סיסמה" type="password" placeholder="הכנס סיסמה" />
                
                <p>תמונה</p>
                <FileUpload onFileUploaded={(imagePath) => this.imageUploaded(imagePath)}/>

                <Input setInput={(e)=>this.setState({FirstName:e.target.value})} title="שם פרטי" type="text" placeholder="הכנס שם פרטי" />
                
                <Input setInput={(e)=>this.setState({LastName:e.target.value})} title="שם משפחה" type="text" placeholder="הכנס שם משפחה" />
                
                <Input setInput={(e)=>this.setState({BDate: e.target.value})} title="תאריך לידה" type="date" />
                
                <div style={{float:'right',width: "50%",padding: "5px"}}> 
                <RI action={(e)=>this.setState({Gender:"נקבה"})} value="נקבה" image='images/female.jpg' width="120" height="120" size="8"/>
                 <p>אני אישה</p>
                </div>
                
                <div style={{float:'right',width: "50%",padding: "5px"}}> 
                <RI action={(e)=>this.setState({Gender:"זכר"})} value="זכר" image='images/male.jpg' width="120" height="120" size="8"/>
                 <p>אני גבר</p>
                </div>
                
                <Input setInput={(e)=>this.setState({PhoneNo1:e.target.value})} title="טלפון1" type="text" placeholder="הכנס מספר טלפון" />
                
                <Input setInput={(e)=>this.setState({PhoneNo2:e.target.value})} title="טלפון2" type="text" placeholder="הכנס מספר טלפון" />
                
                <Input setInput={(e)=>this.setState({AboutMe:e.target.value})} title="קצת עליי" type="text" placeholder="הכנס תיאור" />
                
                <p>הכשרות</p>
                <ReactCardFlip isFlipped={this.state.isFlippedQual}>
                
                <div>
                    {qualList}
                </div>
                
                <div id="qual">
                    <h3>פרטי הכשרה {this.state.qualName}</h3>
                    <Input setInput={(e)=>this.setState({QualDate: e.target.value})} title="תאריך הכשרה" type="date" />
                    <p>קהל יעד</p>
                    {popList}<br/>
                    <p>תעודות</p>
                    <FileUpload onFileUploaded={(imagePath) => this.imageUploaded(imagePath)}/>
                    <ButtonF action={()=>this.confirmQual()}  className="btn btn-primary btn-block" text="אישור"/><br/>
                    </div>

                </ReactCardFlip>
                    
                    <div>
                    <label>שפות</label><br/>
                    {langList}
                    </div>
                    
                    <div>
                    <label>אזורי עבודה</label><br/>
                    {areasList}
                    </div>
                    
                    <Input setInput={(e)=>this.setState({PricePerHour:e.target.value})} title="מחיר לשעה" type="number" placeholder="הכנס מחיר לשעה" min="0"/>

                <label>קישורים</label><br/>
                <ReactCardFlip isFlipped={this.state.isFlippedLink}>
                <div>
                    <Form.Row>
                    {linksList}
                </Form.Row>
                </div>
                <div>
                    <Input type="text" placeholder="הכנס כתובת" />
                    <ButtonF  className="btn btn-primary btn-block" action={(e)=>this.setState({isFlippedLink:false})} text="אישור"/><br/>
                </div>

                </ReactCardFlip><br/>

                <button type="submit" className="btn btn-primary btn-block" onClick={this.validate}>סיום</button>
                </Form>
        )
    }
}
