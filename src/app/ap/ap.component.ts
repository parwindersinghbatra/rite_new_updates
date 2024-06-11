import { Component, ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';



interface UserData {
  Identifier: string;
  PositionID: string;
  RecruiterName: string;
  Email: string;

  JobType: string;
  Duration: string;
  PositionTitle: string;
  Location: string;
  ScheduleHours: string;
  Subject: string;
}

@Component({
  selector: 'app-ap',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ap.component.html',
  styleUrl: './ap.component.css'
})
export class APComponent {
  jsonData: UserData[] = [];
  tableSearchData: UserData[] = [];
  recruiterNames: string[] = [];
  searchQuery: string = '';
  selectedPositionId: string | null = null;
  filteredNames: any;
  selectedRecruiterName: string | null = null;
  selectedUserData: UserData | null = null;;
  isVisible: boolean = false;
  isShow = false;
  isVisibleData = false;
  isPreviewJDShow = false;
  isSeachData = false;
  isSearchDataVisible = false;
  textVariable: string = '';
  isVisiblePageDetails = false

 // Pagination properties
 currentPage: number = 1;
 itemsPerPage: number = 10;
 totalPages: number = 0;

  @ViewChild('selectValue') selectValue: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.selectedRecruiterName = '';
    this.http.get<any>('../../assets/user.json').subscribe((data) => {
      this.jsonData = data;
      this.extractRecruiterNames();
      this.calculateTotalPages();
    });
  }
  ngAfterViewInit() {
    this.setDefaultSelectValue();
  }
  setDefaultSelectValue() {
    if (this.selectValue) {
      this.selectValue.nativeElement.value = '';
      this.selectedPositionId = '';
    }
  }
  onPositionSelect(event: any) {
    this.selectedPositionId = event.target.value;
    this.updateRecruiterNames();
    this.updateSelectedUserData()
  }
  onRecruiterNameSelected(event: any) {
    const target = event.target.value;
    console.log('Selected recruiter name:', target);
  }
  extractRecruiterNames() {
    const recruiterSet = new Set<string>();
    this.jsonData.forEach((item) => recruiterSet.add(item.RecruiterName));
    this.recruiterNames = Array.from(recruiterSet);
  }
  updateRecruiterNames() {
    if (!this.selectedPositionId) {
      this.filteredNames = [];
      return;
    }
    this.isVisible = true;
    this.isVisibleData = true;
    const selectedItem = this.jsonData.find(
      (item) => item.PositionID === this.selectedPositionId
    );
    this.selectedRecruiterName = selectedItem?.RecruiterName ?? null;
    console.log(this.selectedRecruiterName);
  }

updateSelectedUserData(){
  if (!this.selectedPositionId) {
    this.selectedUserData = null;
    return;
  }
  this.selectedUserData =
    this.jsonData.find(
      (item: UserData) => item.PositionID === this.selectedPositionId
    ) || null;
    console.log(this.selectedUserData)
}

  getRecruiterNames(): UserData[] {
    if (!this.selectedPositionId) {
      return [];
    }

    return this.jsonData.filter(
      (item: UserData) => item.PositionID === this.selectedPositionId
    );
  }
  onOverlayClick(event: any) {
    this.closePopup();
  }
  onpreviewJDPopup(event: any) {
    this.closeJDPopup();
  }
  showDetails() {
    this.isShow = true;
    this.isVisibleData = true;
    this.isSeachData = false;
    this.updateSelectedUserData()
  }
  clearAll() {
    this.isVisible = false;
    this.isVisibleData = false;
    this.isSeachData = false;
    this.isSearchDataVisible = false;
    this.isVisiblePageDetails = false;
    this.setDefaultSelectValue();
  }
  closePopup() {
    this.isShow = false;
  }
  previewJD() {
    this.isPreviewJDShow = true;
  }
  closeJDPopup() {
    this.isPreviewJDShow = false;
  }
  booleanSearch() {
    this.isVisibleData = false;
    this.isSeachData = true;
  }

  PCRSearch() {
    this.isSeachData = false;
    this.isVisibleData = true;
  }

  emailsend(data: any) {
    
    const emailAddress = data.Email
    const Subject = data.Subject
    const body = `Dear ${data.RecruiterName},
      I am wirting the email for ${data.PositionID} at this company.
      Thank you for you time
      ${data.RecruiterName}`

      const mailbox = `mailto:${emailAddress}?Subject=${encodeURIComponent(Subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailbox;
    console.log("Email Sent")
  }
  Search_data_PCR(text: string) {
    this.isSearchDataVisible = true;
    this.isVisiblePageDetails = true
    this.http.get<UserData[]>('assets/user.json').subscribe((data) => {
      this.tableSearchData = data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(text.toLowerCase())
        )
       
      );
      console.log(this.tableSearchData)
      this.calculateTotalPages();
    });
    
  }

calculateTotalPages() {
  this.totalPages = Math.ceil(this.tableSearchData.length / this.itemsPerPage);
}

getPaginatedData(){
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.tableSearchData.slice(startIndex, endIndex);
}

goToPage(pageNumber: number) {
  if(pageNumber >= 1 && pageNumber <= this.totalPages)
    this.currentPage= pageNumber;   
}
}