import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

interface Contact {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  inqueryForm!: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.createInqueryForm();
  }
  
  title = 'portfolio';
  portfolio = {
    name: "I'm Sunil Sanghadiya",
    title: "Full Stack Developer",
    projects: [
      {
        id: 1,
        name: "Likhitan",
        description: "A modern blogging platform built with Angular and .NET Core, featuring real-time blogs and treding contents and manny more.",
        technologies: ["Angular", ".NET Core", "SqlServer", "EntityFrameworkCore"]
      },
      {
        id: 2,
        name: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        technologies: ["React", "Firebase", "Material-UI", "Socket.io"]
      }
    ]
  };

  contact: Contact = {
    name: '',
    email: '',
    message: ''
  };

  createInqueryForm() {
    return this.inqueryForm = this._fb.group({
      name: [this.contact.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(128)])],
      email: [this.contact.email, Validators.compose([Validators.required, Validators.email])],
      message: [this.contact.message, Validators.compose([Validators.minLength(5)])]
    })
  }

  f() { return this.inqueryForm.controls; }
  
  openProject(project: Project): void {
    alert(`Opening project: ${project.name}\n\n${project.description}`);
  }

  submitForm() {
    if (this.inqueryForm.invalid) {
      return
    }

    
  }

  onEmail() {
    if(this.inqueryForm.valid) {
      
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
