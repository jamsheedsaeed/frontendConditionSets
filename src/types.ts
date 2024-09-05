// src/types.ts

export interface Project {
    id: string;
    name: string;
    description: string;
  }
  
  // Example: types.ts or a similar file
  export interface Task {
    id: string;
    name: string;
    description: string;
    projectId: string;
    status: 'Open' | 'In Development' | 'Testing' | 'Completed' | 'Closed'; // Add status here
    assignedTo?: number; // Optional if not always returned

  }
  


  