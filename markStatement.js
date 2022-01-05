function Student(personalInfo, scoreArray) {

  //personal details

  this.personalInfo = personalInfo;
  this.name = this.personalInfo[0] || "";
  this.dob = this.personalInfo[1] || "dd-mm-yyyy";
  this.sex = this.personalInfo[2] || "";

  //course info

  this.programmeType = this.personalInfo[3] || "";
  this.programmeName = this.personalInfo[4] || "";
  this.department = this.personalInfo[5] || "";
  this.subject = this.personalInfo[6] || "";

  //organization info

  this.universityName = this.personalInfo[7] || "";
  this.collegeName = this.personalInfo[8] || "";

  this.personalDataTable = (`<div><p>Programme: ${this.programmeName} <span style="text-align:right;">Subject: ${this.subject}</span></p>
  <table>
  <tr>
  <td>Name of the Examinee & Date of Birth</td>
  <td>Sex</td>
  <td>Register Number</td>
  <td>Serial Number</td>
  </tr>
  <tr>
  <td>${this.name}</br>${this.dob}</td>
  <td>${this.sex}</td>
  <td>Register Number</td>
  <td>Serial Number</td>
  </tr>
  <tr>
  <td>Department</br>${this.department}</td>
  <td>${this.sex}</td>
  <td>Register Number</td>
  <td>Serial Number</td>
  </tr>
  </table>
  </div>`);

  //marksheet layout resource info
  this.universityLogoSrc = this.personalInfo[9] || "";
  this.passportSizePhotoSrc = this.personalInfo[10] || "";
  this.headerText = this.personalInfo[11] || "";

  // marks statement processing

  this.score = scoreArray;
  this.structuredScore = [];
  this.totalCourses = this.score.length;
  this.totalScores = 0;
  this.totalMaxScore = 0;

  // partwise details

  this.totalCredits = {};
  this.totalArrears = {};
  this.sumOfScoresXCredits = {};
  this.sumOfMaxScoreXCredits = {};
  this.gpa = {};
  this.overallGrade = {};
  this.percentage = {};
  this.classCategory = {};
  this.scoreDetails = "";
  this.footerInfo = "";


  this.setPropertyValue = (object, propName, propValue) => {
    object[propName] = propValue;
  };

  // setting processed data to the objects of structured score array

  this.setSumData = function(srcObjArr, srcObjIfProp, srcObjIfVal, srcObjSumProp, tarObj, tarObjProp) {

    tarObj[tarObjProp] = 0;

    for (let item in srcObjArr) {

      if (tarObj !== this.totalArrears) {
        tarObjProp == "overall" ? tarObj[tarObjProp] += Number(srcObjArr[item][srcObjSumProp]) : tarObj[tarObjProp];

        (srcObjIfProp == "part" && srcObjArr[item][srcObjIfProp] == srcObjIfVal) ? tarObj[tarObjProp] += Number(srcObjArr[item][srcObjSumProp]): tarObj[tarObjProp];

      } else {
        tarObjProp == "overall" && srcObjArr[item]["isPass"] == "F" ? tarObj[tarObjProp] += srcObjSumProp : tarObj[tarObjProp];

        (srcObjIfProp == "part" && srcObjArr[item][srcObjIfProp] == srcObjIfVal) && srcObjArr[item]["isPass"] == "F" ? tarObj[tarObjProp] += srcObjSumProp : tarObj[tarObjProp];
      }
    }
  };

  this.getOverallGrade = (gradeValue) => {

    return (gradeValue >= 9.5) ? "O+" : (gradeValue >= 9.0 && gradeValue < 9.5) ? "O" : (gradeValue >= 8.5 && gradeValue < 9.0) ? "D++" : (gradeValue >= 8.0 && gradeValue < 8.5) ? "D+" : (gradeValue >= 7.5 && gradeValue < 8.0) ? "D" : (gradeValue >= 7.0 && gradeValue < 7.5) ? "A++" : (gradeValue >= 6.5 && gradeValue < 7.0) ? "A+" : (gradeValue >= 6.0 && gradeValue < 6.5) ? "A" : (gradeValue >= 5.5 && gradeValue < 6.0) ? "B+" : (gradeValue >= 5.0 && gradeValue < 5.5) ? "B" : (gradeValue >= 4.5 && gradeValue < 5.0) ? (this.programmeType == "UG" ? "C+" : "U") : (gradeValue >= 4.0 && gradeValue < 4.5) ? (this.programmeType == "UG" ? "C" : "U") : "U";

  };

  this.getCourseGrade = (gradePoints) => {

    return (gradePoints >= 9.0) ? "O" : (gradePoints >= 8.0 && gradePoints < 9.0) ? "D+" : (gradePoints >= 7.5 && gradePoints < 8.0) ? "D" : (gradePoints >= 7.0 && gradePoints < 7.5) ? "A+" : (gradePoints >= 6.0 && gradePoints < 7.0) ? "A" : (gradePoints >= 5.0 && gradePoints < 6.0) ? "B" : (gradePoints >= 4.0 && gradePoints < 5.0) ? (this.programmeType == "UG" ? "C" : "U") : "U";

  };

  this.getClass = (gpa) => {

    return (gpa >= 9.0) ? "First Class - Exemplary" : (gpa >= 7.5 && gpa < 9.0) ? "First Class with Distinction" : (gpa >= 6.0 && gpa < 7.5) ? "First Class" : (gpa >= 5.0 && gpa < 6.0) ? "Second Class" : (gpa >= 4.0 && gpa < 5.0) ? (this.programmeType == "UG" ? "Third Class" : "Re-appear") : "Re-appear";

  };

  this.getColumnHeads = (headsArr, trAttribute, tdAttribute) => {

    let colHead = `<tr ${trAttribute}>`;
    for (let col = 0; col < headsArr.length; col++) {
      colHead += `<td ${tdAttribute}>${headsArr[col]||""}</td>\n`;
    }
    colHead += "</tr>";
    return colHead;
  };

  this.setStructuredScore = () => {

    for (let i = 0; i < this.totalCourses; i++) {

      // assign input values

      let course = this.score[i][0] || "";
      let courseCode = this.score[i][1] || "";
      let credit = this.score[i][2] || 0;
      let marksSecured = this.score[i][3] || 0;
      let passingMin = this.score[i][4] || 0;
      let maxMark = this.score[i][5] || 0;
      let part = this.score[i][6] || "";
      let semester = this.score[i][7] || 0;
      let monthYear = this.score[i][8] || "";

      // computing values for output

      let gradeFactor = 10 / maxMark;
      let gradePoints = (gradeFactor * marksSecured).toFixed(3);
      let scoredCredit = gradePoints * credit;
      let maxCredit = (gradeFactor * maxMark) * credit;
      let isPass = Number(gradeFactor * marksSecured) < Number(gradeFactor * passingMin) ? "F" : "P";
      let grade = this.getCourseGrade(gradePoints);

      this.totalScores += Number(marksSecured);
      this.structuredScore.push({
        part: part,
        course: course,
        courseCode: courseCode,
        marksSecured: marksSecured,
        passingMin: passingMin,
        maxMark: maxMark,
        semester: semester,
        monthYear: monthYear,
        gradePoints: gradePoints,
        credit: credit,
        scoredCredit: scoredCredit,
        maxCredit: maxCredit,
        isPass: isPass,
        grade: grade
      });
    }
  };

  this.setStructuredScore();

  this.setOutputData = () => {

    for (let par = 1; par <= 6; par++) {

      let propName, partLabel, tdAttribute;

      propName = (par < 6) ? `part${par}` : `overall`;
      partLabel = (par < 6) ? `Part ${par}` : "Overall";
      tdAttribute=(par < 6) ? "": `style="font-weight:600; color:#32328f;"`;

      this.setSumData(this.structuredScore, "part", par, "scoredCredit", this.sumOfScoresXCredits, propName);
      this.setSumData(this.structuredScore, "part", par, "maxCredit", this.sumOfMaxScoreXCredits, propName);
      this.setSumData(this.structuredScore, "part", par, "credit", this.totalCredits, propName);
      this.setSumData(this.structuredScore, "part", par, 1, this.totalArrears, propName);

      this.gpa[propName] = Number(this.sumOfScoresXCredits[propName]) / Number(this.totalCredits[propName]) || 0;
      this.percentage[propName] = (Number(this.sumOfScoresXCredits[propName]) / Number(this.sumOfMaxScoreXCredits[propName])) * 100 || 0;
      this.setPropertyValue(this.overallGrade, propName, this.getOverallGrade(this.gpa[propName]));
      this.setPropertyValue(this.classCategory, propName, this.getClass(this.gpa[propName]));

      this.footerInfo += `<tr>
        <td ${tdAttribute}>${partLabel}</td>
        <td ${tdAttribute}>${this.totalCredits[propName]}</td>    <td ${tdAttribute}>${Number(this.sumOfScoresXCredits[propName]).toFixed(3)}</td>
        <td ${tdAttribute}>${Number(this.sumOfMaxScoreXCredits[propName]).toFixed(3)}</td>
        <td ${tdAttribute}>${this.totalArrears[propName]}</td>
        <td ${tdAttribute}>${Number(this.gpa[propName]).toFixed(3)}</td>
        <td ${tdAttribute}>${this.overallGrade[propName]}</td>
        <td ${tdAttribute}>${Number(this.percentage[propName]).toFixed(2)}</td>    
        <td ${tdAttribute}>${this.classCategory[propName]}</td></tr>`;
    }
  };

  this.setOutputData();

  this.getMarkSheet = () => {

    let colHeadArr, footHeadArr, style;
		
     colHeadArr = ["Month Year", "Semester", "Course", "Course Code", "Credits", "Marks Secured", "Passing Minimum", "Maximm Mark", "Grade Points", "Grade", /* "Earned GP Credits", "Max GP Credits",*/ "Pass Status"];
    footHeadArr = ["Part", "Credits", "Earned GP Credits", "Max GP Credits", "No. of Arrears", "GPA", "Grade", "Percentage", "Class"];
    
    style = `<style>\n
    div{max-width:1200px;}
    .tab1{
    background-color:#306292;
    color:#f0f0f0;
    padding:10px;
    font-family:"calibri light";
    }\n
    
    table{
    border:0px;
    border-spacing:0;
    border:0.1px solid #f0f0f0;
    font-family:"calibri light"; 
    }\n
    td{
    border-spacing:0;
    padding:3px 5px 5px 10px;
    border:0px;    
    border-right:0.1px solid #f0f0f0;
    }\n
    
    </style>`;
		
    this.scoreDetails+=`<tr><td style="text-align:center;"><b>Semester-${this.structuredScore[0].semester}</b></td>
        ${String("<td></td>").repeat(colHeadArr.length-1)}</tr><tr>
        <td></td><td></td><td style="text-align:center;"><b>Part-${this.structuredScore[0].part}</b></td>${String("<td></td>").repeat(colHeadArr.length-3)}</tr>`;
    
    for (let i = 0; i < this.structuredScore.length; i++) {
      let j = i + 1;
      this.scoreDetails += `<tr>\n
      <td>${this.structuredScore[i].monthYear}</td>
      <td>${this.structuredScore[i].semester}</td>
     <!-- <td>${this.structuredScore[i].part}</td> -->     
      <td>${this.structuredScore[i].course}</td>
      <td>${this.structuredScore[i].courseCode}</td>
      <td>${this.structuredScore[i].credit}</td>
      <td>${this.structuredScore[i].marksSecured}</td>
      <td>${this.structuredScore[i].passingMin}</td>
      <td>${this.structuredScore[i].maxMark}</td>
      <td>${Number(this.structuredScore[i].gradePoints).toFixed(3)}</td>
      <td>${this.structuredScore[i].grade}</td>      
      <!--<td>${Number(this.structuredScore[i].scoredCredit).toFixed(3)}</td>
      <td>${Number(this.structuredScore[i].maxCredit).toFixed(3)}</td>-->
      <td>${this.structuredScore[i].isPass}</td>
      </tr>
      `;
       j < this.structuredScore.length && Number(this.structuredScore[i].semester) !== Number(this.structuredScore[j].semester) ?
        this.scoreDetails += `<tr><td style="text-align:center;"><b>Semester-${this.structuredScore[j].semester}</b></td>
        ${String("<td></td>").repeat(colHeadArr.length-1)}</tr>` : this.scoreDetails;
      j < this.structuredScore.length && (Number(this.structuredScore[i].semester) !== Number(this.structuredScore[j].semester)
      || Number(this.structuredScore[i].part) !== Number(this.structuredScore[j].part)) ?
        this.scoreDetails += `<tr>
        <td></td><td></td><td style="text-align:center;"><b>Part-${this.structuredScore[j].part}</b></td>${String("<td></td>").repeat(colHeadArr.length-3)}</tr>` : this.scoreDetails;
    }
this.scoreDetails+=`<tr>
        <td></td><td></td><td style="text-align:center;padding-bottom:60px;color:#3232af;"><b>--End of Statement---</b></td>${String("<td></td>").repeat(colHeadArr.length-3)}</tr>`;
    
    !document.getElementById("div1") ? (document.write(`${style}\n<div id="div1">\n <h1>Mark Statement</h1>\n</div>`)) : !1;

    document.getElementById("div1").innerHTML = (`${this.personalDataTable}<table>\n
    ${this.getColumnHeads(colHeadArr,"class='tab1'")}\n
    ${this.scoreDetails}\n</table>\n<table>
    ${this.getColumnHeads(footHeadArr,"class='tab1'")}
    \n${this.footerInfo}\n</table>\n`);
  }
  
}
  /* personal details*/

  var personalInfoMsc = ["Jarang", "d7-d0-ddd9", "M", "PG", "M.Sc", "Biotechnology", "Biotechnology", "University of Madras", "University of Madras", "", "", ""];

  var personalInfoBsc = ["Jarang", "d7-d0-ddd9", "M", "UG", "B.Sc", "Biotechnology", "Biotechnology", "University of Madras", "Mohammed Sathak College of Arts and Science", "", "", ""];

  /*----- Score Data ----

   			@param course,
        @param courseCode,
        @param credit,
        @param marksSecured,
        @param passingMin,
        @param maxMark,
        @param part,
        @param semester,
        @param monthYear
  */

  var sem1 = [
    ["Biochemistry", "LIFC201", 4, 77, 50, 100, 3, 1, "Dec 2010"],
    ["Molecular Cell Biology", "LIFC202", 4, 71, 50, 100, 3, 1, "Dec 2010"],
    ["Microbiology", "LIFC203", 4, 65, 50, 100, 3, 1, "Dec 2010"],
    ["Practical I: Biochemistry, Molecular Cell Biology, and Microbiology", "LIFC204", 4, 63, 50, 100, 3, 1, "Dec 2010"],
    ["Molecular Developmental Biology", "LIFE205", 3, 76, 50, 100, 3, 1, "Dec 2010"],
    ["Molecular Genetics", "LIFE206", 3, 78, 50, 100, 3, 1, "Dec 2010"],
    ["Spoken and Presentation Skills Advanced Level", "UOMS004", 2, 73, 50, 100, 4, 1, "Dec 2010"],
    ["Personlity Enrichment", "UOMS005", 2, 88, 50, 100, 4, 1, "Dec 2010"]
  ];

  var sem2 = [
    ["Enzymology &amp; Enzyme Technology ", "LIFC208", 4, 75, 50, 100, 3, 2, "Apr 2011"],
    ["Recombinant DNA Technology", "LIFC209", 4, 72, 50, 100, 3, 2, "Apr 2011"],
    ["Animal Cell Biotechnology", "LIFC210", 4, 72, 50, 100, 3, 2, "Apr 2011"],
    ["Plant Biotechnology", "LIFC211", 4, 75, 50, 100, 3, 2, "Apr 2011"],
    ["Practical II: Enzyme &amp; Enzyme Technology, Recombinant DNA Technology, Animal Cell Biotechnology, and Plant Biotechnology", "LIFC212", 4, 76, 50, 100, 3, 2, "Apr 2011"],
    ["Tissue Engineering", "LIFE214", 3, 60, 50, 100, 3, 2, "Apr 2011"],
    ["Genomics and Proteomics", "LIFE215", 3, 67, 50, 100, 3, 2, "Apr 2011"],
    ["Phytopharmacognosy", "LIFE308", 3, 74, 50, 100, 3, 2, "Apr 2011"],
    ["Life and Managerial Skills", "UOMS006", 2, 78, 50, 100, 4, 2, "Apr 2011"],
    ["French for Beginners I", "UOMS009", 2, 96, 50, 100, 4, 2, "Apr 2011"]
  ];

  var sem3 = [
    ["Immunology", "LIFC216", 4, 72, 50, 100, 3, 3, "Dec 2011"],
    ["Bioprocess and Microbial Technology", "LIFC217", 4, 72, 50, 100, 3, 3, "Dec 2011"],
    ["Nanobiotechnology", "LIFC218", 4, 75, 50, 100, 3, 3, "Dec 2011"],
    ["Practical III: Immunology, Bioprocess and Microbial Technology", "LIFC219", 4, 74, 50, 100, 3, 3, "Dec 2011"],
    ["Environmental Biotechnology", "LIFE220", 3, 82, 50, 100, 3, 3, "Dec 2011"],
    ["Mass Cultivation of Algae", "LIFE307", 3, 90, 50, 100, 3, 3, "Dec 2011"],
    ["Plant Tissue Culture", "LIFE314", 3, 87, 50, 100, 3, 3, "Dec 2011"],
    ["Internship", "UOMI001", 2, 83, 50, 100, 4, 3, "Dec 2011"]
  ];

  var sem4 = [
    ["Dissertation", "LIFC223", 8, 74, 50, 100, 3, 4, "Apr 2012"]
  ]

  //B.Sc. Biotechnology

  var sem_1 = [

    ["FC Tamil Paper-I", "FA1E", 4, 81, 40, 100, 1, 1, "Nov 2007"],
    ["FC English Paper-I", "FZ1E", 4, 52, 40, 100, 2, 1, "Nov 2007"],
    ["CM Paper-I Cell Biology", "BK1A", 4, 41, 40, 100, 3, 1, "Nov 2007"],
    ["CA Microbiology", "ZBKA", 3, 82, 40, 100, 3, 1, "Nov 2007"]
  ];

  var sem_2 = [

    ["FC Tamil Paper-II", "FA2G", 4, 68, 40, 100, 1, 2, "Apr 2008"],
    ["FC English Paper-II", "FZ2G", 4, 53, 40, 100, 2, 2, "Apr 2008"],
    ["CM Practical-I A Cell Biology", "BK11", 2, 50, 20, 50, 3, 2, "Apr 2008"],
    ["CM Practical-II A Molecular Developmental Biology", "BK21", 2, 50, 20, 50, 3, 2, "Apr 2008"],
    ["CM Paper-II A Molecular Developmental Biology", "BK2A", 5, 70, 40, 100, 3, 2, "Apr 2008"],
    ["CM Practical-II B Chemistry", "ZCB3", 2, 50, 20, 50, 3, 2, "Apr 2008"],
    ["CA Practical-I B Microbiology", "ZBK1", 2, 44, 20, 50, 3, 2, "Apr 2008"],
    ["CA Chemistry", "ZCBE", 5, 85, 40, 100, 3, 2, "Apr 2008"]
  ];

  var sem_3 = [

    ["FC Tamil Paper-III", "FA3H", 4, 76, 40, 100, 1, 3, "Nov 2008"],
    ["FC English Paper-III", "FZ3C", 4, 60, 40, 100, 2, 3, "Nov 2008"],
    ["CM Genetics", "BK3A", 4, 75, 40, 100, 3, 3, "Nov 2008"],
    ["CA Biochemistry", "ZCAK", 3, 75, 40, 100, 3, 3, "Nov 2008"]
  ];

  var sem_4 = [

    ["FC Tamil Paper-IV", "FA4J", 4, 75, 40, 100, 1, 4, "Apr 2009"],
    ["FC English Paper-IV", "FZ4D", 4, 48, 40, 100, 2, 4, "Apr 2009"],
    ["CM Paper-IV Plant Biotechnology", "BK4A", 4, 92, 40, 100, 3, 4, "Apr 2009"],
    ["CM Practical-III B Genetics", "BK31", 5, 50, 20, 50, 3, 4, "Apr 2009"],
    ["CM Practical-IV Plant Biotechnology", "BK41", 5, 50, 20, 50, 3, 4, "Apr 2009"],
    ["CA Biophysics and Biostatistics", "ZBKB", 3, 54, 40, 100, 3, 4, "Apr 2009"],
    ["CA Practical-III A Biochemistry", "ZBA3", 2, 50, 20, 50, 3, 4, "Apr 2009"],
    ["Environmental Studies", "EN4A", 0, 52, 30, 75, 4, 4, "Apr 2009"],
    ["Environmental Studies - Field Work", "EN41", 0, 25, 10, 25, 4, 4, "Apr 2009"]

  ];

  var sem_5 = [
    ["CM Paper-V Animal and Medical Biotechnology", "BK5A", 3, 75, 40, 100, 3, 5, "Nov 2009"],
    ["CM Paper-VI Environmental Biotechnology", "BK5B", 4, 65, 40, 100, 3, 5, "Nov 2009"],
    ["CM Paper-VII Microbial Biotechnology", "BK5C", 4, 73, 40, 100, 3, 5, "Nov 2009"],
    ["AO Genetic Engineering", "RBKA", 4, 80, 40, 100, 3, 5, "Nov 2009"]
  ];

  var sem_6 = [
    ["CM Practical-V A Animal Biotechnology", "BK51", 3, 50, 20, 50, 3, 6, "Apr 2010"],
    ["AO Practical-V B Genetic Engineering", "RBK1", 2, 50, 20, 50, 3, 6, "Apr 2010"],
    ["CM Paper-VIII Immunotechnology", "BK6A", 3, 91, 40, 100, 3, 6, "Apr 2010"],
    ["CM Paper-IX Bioprocess and Engineering", "BK6B", 4, 84, 40, 100, 3, 6, "Apr 2010"],
    ["CM Paper-X Intellectual Property Management, Biosafety, and Bioethics", "BK6C", 2, 75, 40, 100, 3, 6, "Apr 2010"],
    ["CM Practical-VI A Immunotechnology", "BK61", 2, 50, 20, 50, 3, 6, "Apr 2010"],
    ["CM Practical-VI B Bioprocess and Engineering", "BK62", 2, 50, 20, 50, 3, 6, "Apr 2010"],
    ["AO Genomics, Proteomics, and Metabolomics", "RBKB", 4, 89, 40, 100, 3, 6, "Apr 2010"],
    ["AO Practical-VI C Genomics, Proteomics, and Metabolomics", "RBK3", 1, 50, 20, 50, 3, 6, "Apr 2010"]
  ];

  var msc = sem1.concat(sem2, sem3, sem4);
  var bsc = sem_1.concat(sem_2, sem_3, sem_4, sem_5, sem_6);

  var bscMarksheet = new Student(personalInfoBsc, bsc);
  //var mscMarksheet = new Student(personalInfoMsc, msc);

  bscMarksheet.getMarkSheet();
  //mscMarksheet.getMarkSheet();

