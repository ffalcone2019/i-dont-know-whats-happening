import './style.css'

// Global
const timeQuantum1 = 8;
const timeQuantum2 = 12;

// Input times for the 9 Job
const p1 = [ 7, 22, 6, 19, 12, 44, 8, 21, 10, 37, 5, 24, 6, 44, 7, 43, 8 ];
const p2 = [ 14, 48, 15, 44, 17, 42, 22, 37, 19, 76, 14, 41, 16, 31, 17, 43, 18 ];
const p3 = [ 8, 43, 7, 41, 6, 45, 8, 21, 9, 35, 14, 18, 5, 26, 3, 31, 6 ];
const p4 = [ 13, 37, 4, 41, 5, 35, 12, 41, 8, 55, 15, 34, 6, 73, 5, 77, 3 ];
const p5 = [ 6, 34, 7, 21, 5, 44, 6, 32, 7, 28, 3, 48, 11, 44, 6, 33, 3, 28, 4 ];
const p6 = [ 9, 32, 4, 28, 5, 10, 6, 12, 7, 14, 9, 18, 12, 24, 15, 30, 8 ];
const p7 = [ 14, 46, 17, 41, 11, 42, 15, 21, 4, 32, 7, 19, 16, 33, 10 ];
const p8 = [ 4, 64, 5, 53, 6, 44, 4, 73, 6, 87, 5, 66, 8, 25, 6, 33, 9, 41, 7 ];
const p9 = [ 13, 37, 8, 41, 7, 27, 12, 29, 5, 27, 6, 18, 3, 33, 4, 62, 6 ];

class Process{
    constructor(pid, priority, timing){
        this.pid = pid;
        this.priority = priority;
		this.timeQuantum = timeQuantum1;

		this.arrivalTime = 0;	// All Processes arrive at time 0
        this.timings = timing;
		this.endTime = 0;
        this.currentBurst = 0;

        this.waitTime = 0;
        this.responseTime = 0;
        this.turnaroundTime = 0;

		this.currentStatus = "";
    }
}

const p_1 = new Process("P1", 1, p1);
const p_2 = new Process("P2", 1, p2);
const p_3 = new Process("P3", 1, p3);
const p_4 = new Process("P4", 1, p4);
const p_5 = new Process("P5", 1, p5);
const p_6 = new Process("P6", 1, p6);
const p_7 = new Process("P7", 1, p7);
const p_8 = new Process("P8", 1, p8);
const p_9 = new Process("P9", 1, p9);

class Scheduler{
	constructor(){
		this.startTime = 0;
		this.currentTime = 0;

		this.initializing = [p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9];
		this.amountOfJobs = this.initializing.length;

		this.preemptQueue = [];
		this.completed = [];
		this.readyQueue = [];
		this.ioQueue = [];

		// All processes arrive at time 0
		this.init();
	}

	init(){
		this.initializing.forEach(process => {
			this.readyQueue.push(process);
		})
		this.start();
	}

	start(){
		// while(this.isRunning() === true)
		{
			// Time is 0 and the scheduler just began, as each process arrived at time 0, we only have to worry about pos 0 in the array
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			console.log("Checking if (Current Time):", this.currentTime, "is 0")
			if(this.currentTime === this.startTime) {
				console.log("The currentTime is 0");
				console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

				// Checking to see if the first burstTime is less then or equal to Queue1 time quantum
				console.log("Checking to see if the burstTime:", parseInt(this.readyQueue[0].timings[0], 10), "for:", this.readyQueue[0].pid, "is less then the timeQuantum:", this.timeQuantum1);
				console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
				if(parseInt(this.readyQueue[0].timings[0], 10) <= timeQuantum1) {	// Dont have to check the priority as each process starts off in queue 1 and gets preempted					
					console.log("The timeQuantum is greater then the burstTime");
					console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
					console.log(this.readyQueue[0].pid, "finishes its burstTime of:", this.readyQueue[0].timings[0]);
					this.currentTime = parseInt(this.readyQueue[0].timings[0], 10);	// Setting the current run time to the process burst time
					this.readyQueue[0].endTime = this.currentTime;	// Setting the process end time to the current time (set earlier to the burst time)	
					console.log("The currentTime is now:", this.currentTime + ",", "The process has completed at:", this.readyQueue[0].endTime);
					console.log("The process completed it burst and now the timing is removed from the array", this.readyQueue[0].timings)
					this.readyQueue[0].timings.shift(); // Removing the completed burst time
					console.log("\t\t\t\t\t\t\t\t\t   ",this.readyQueue[0].timings)
					console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

					console.log("\t\t\t  " + this.readyQueue[0].pid, "goes to I/O for:", this.readyQueue[0].timings[0], "time units and gets removed from the readyQueue");
					console.log("\t\t\t\t\t Updating:", this.readyQueue[0].pid + "'s arrivalTime from:", this.readyQueue[0].arrivalTime, "to:", parseInt(this.readyQueue[0].endTime, 10) + parseInt(this.readyQueue[0].timings[0], 10))
					this.readyQueue[0].arrivalTime = this.readyQueue[0].endTime + this.readyQueue[0].timings[0];
					this.readyQueue[0].timings.shift();

					this.ioQueue.push(this.readyQueue[0]);	// Since the process has completed its first burst it gets sent to I/O
					console.log("\t\t\t\t\t\t  ", ":The I/O Queue:  ",this.ioQueue);
					this.readyQueue.shift();	// Once the process has been sent to I/O the readyQueue gets shifted to the right removing the process from the array
					console.log("\t\t\t\t\t\t  ", ":The Ready Queue:",this.readyQueue);
					console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
				}
				else {	// If the first burst time is not less then the timeQuantum1 (Queue1): basically greater then the time quantum
					console.log("Current Time is:", this.currentTime)
					console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
					this.currentTime = parseInt(this.readyQueue[0].timings[0], 10) - timeQuantum1;	// Set the current run time to the time quantum as that is how long it can run for
					this.readyQueue[0].timings[0] = parseInt(this.readyQueue[0].timings[0], 10) - timeQuantum1; // Update the burst time to account for the running of timeQuantum1
					this.preemptQueue.push(this.readyQueue[0]);	// Because the process couldn't complete before the time quantum it gets preempted
					this.readyQueue.shift();	// Removing the process from the front of the array
					// In the preempt Queue now because it was preempted increment its priority
					if(parseInt(this.preemptQueue[0].priority, 10) != 3){
						
						this.preemptQueue[0].priority += 1; // Increments the priority
						this.preemptQueue[0].arrivalTime = this.currentTime;	// Updates the processes arrival time
					}

					// Goes back into the readyQueue with the new arrivalTime
					this.readyQueue.push(this.preemptQueue[0]);	
					this.preemptQueue.shift();	// The preempt queue gets cleared
				}
			}
			// If the current time does not = 0
				
			// Checking I/O Queue if any processes finished, if so, send them back to the readyQueue, and update their arrivalTime
			
				
			// Checking the readyQueue for priority 1 processes
			this.checkForQ1();
				
			// Checking the readyQueue for priority 2 processes
			this.checkForQ2();

			// Checking the readyQueue for priority 2 processes
			// this.checkForQ3();			
		}
	}

	isRunning(){
		if(this.readyQueue.length  != 0 || this.ioQueue.length != 0)
			{return true;}
		return false;
	}

	checkForQ1(){
		// For the length of the ready Queue
		for(let i = this.readyQueue.length; i >= 0; i--) {
			this.checkIOQueue();
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			console.log("\t\t\t\t\t       The current time is:", this.currentTime);
			console.log("\t\tChecking for Q1 processes in the readyQueue:", this.readyQueue);
			console.log("Current Running Process:", this.readyQueue[0])
			console.log("------------------------------------------------------------------------------------------------------------------------------");
			if(this.readyQueue[0].priority === 1) {
				console.log("\t\t\t\t\t\t", this.readyQueue[0].pid, "Is a Q1 Process")
				console.log("\t\t\t\t Checking if:", this.readyQueue[0].timings[0], "is less then or equal to:", this.readyQueue[0].timeQuantum, ":", parseInt(this.readyQueue[0].timings[0], 10) <= this.readyQueue[0].timeQuantum)
				console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

				if(parseInt(this.readyQueue[0].timings[0], 10) <= this.readyQueue[0].timeQuantum) {
					console.log("\t\t\t Process:", this.readyQueue[0].pid + "'s", "burstTime:", this.readyQueue[0].timings[0], "is less then or Equal to the Q1 timeQuantum", this.readyQueue[0].timeQuantum);
					console.log("\t\t\t\tProcess is running for the length of the timeQuantum:", this.readyQueue[0].timeQuantum)
					console.log("\t\t\t\t\t\tProcess is running...")
					
					console.log("\t\t\t\t     Updating the currentTime from:", this.currentTime, "to:", this.currentTime + this.readyQueue[0].timings[0]);
					this.currentTime += this.readyQueue[0].timings[0];
					console.log("\t\t\t\t      Updating:", this.readyQueue[0].pid + "'s endTime from:", this.readyQueue[0].endTime, "to:", this.currentTime);
					this.readyQueue[0].endTime = this.currentTime;
					console.log("\t\t\t\t\t  Process has stopped running...");

					console.log("\t\t\tProcess:", this.readyQueue[0].pid, "has finished its burstTime and is removed from timings array");
					console.log("\t\t\t " + this.readyQueue[0].pid + "'s timing array:",this.readyQueue[0].timings);
					this.readyQueue[0].timings.shift();
					console.log("\t\t    " + this.readyQueue[0].pid + "'s timing array updated:",this.readyQueue[0].timings);

					console.log("\t\t\t  " + this.readyQueue[0].pid, "goes to I/O for:", this.readyQueue[0].timings[0], "time units and gets removed from the readyQueue");
					console.log("\t\t\t\t\t Updating:", this.readyQueue[0].pid + "'s arrivalTime from:", this.readyQueue[0].arrivalTime, "to:", parseInt(this.readyQueue[0].endTime, 10) + parseInt(this.readyQueue[0].timings[0], 10))
					this.readyQueue[0].arrivalTime = this.readyQueue[0].endTime + this.readyQueue[0].timings[0];
					this.readyQueue[0].timings.shift();

					console.log("\t\t\t\t\t   I/O Queue:", this.ioQueue);
					this.ioQueue.push(this.readyQueue[0]);
					console.log("\t\t\t\t     I/O Queue Updated:", this.ioQueue);

					console.log("\t\t\t\t\tReady Queue:", this.readyQueue);
					this.readyQueue.shift();
					console.log("\t\t\t\t      Ready Queue Updated:", this.readyQueue);
					continue;
				}

				console.log(this.readyQueue[0])
				console.log("\t\t\t\t    Checking if:", this.readyQueue[0].timings[0], "is greater then:", this.readyQueue[0].timeQuantum, ":", parseInt(this.readyQueue[0].timings[0], 10) > this.readyQueue[0].timeQuantum);
				console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
				if (parseInt(this.readyQueue[0].timings[0], 10) > this.readyQueue[0].timeQuantum)
				{ // If the process is less then or equal to the Q1 time Quantum
					console.log("\t\t\t\t",this.readyQueue[0].pid + "'s burstTime:", this.readyQueue[0].timings[0], "is greater then Q1 timeQuantum:", this.readyQueue[0].timeQuantum);
					console.log("\t\t\t\t\t       The current time is:", this.currentTime)

					console.log("\t\t\t\t\t        Process is Running...");
					console.log("\t\t\t\t\tUpdating", this.readyQueue[0].pid + "'s", "burstTime from:", this.readyQueue[0].timings[0], "to:", parseInt(this.readyQueue[0].timings[0], 10) - this.readyQueue[0].timeQuantum);
					this.readyQueue[0].timings[0] = parseInt(this.readyQueue[0].timings[0], 10) - this.readyQueue[0].timeQuantum;
					console.log("\t\t\t\t\t Updating", this.readyQueue[0].pid + "'s", "endTime from:", this.readyQueue[0].endTime, "to:", this.currentTime + this.readyQueue[0].timeQuantum);
					this.readyQueue[0].endTime = this.currentTime + this.readyQueue[0].timeQuantum;
					this.currentTime = this.readyQueue[0].endTime;

					console.log("\t\t\t\t\t  Ready Queue:", this.readyQueue)
					console.log("\t\t\t\t\t  Preempt Queue:", this.preemptQueue)
					console.log("\t\t\tPreempting:", this.readyQueue[0].pid, "from the readyQueue and pushing it to the preemptQueue")
					this.preemptQueue.push(this.readyQueue[0]);	// Because the process couldn't complete before the time quantum it gets preempted
					this.readyQueue.shift();	// Removing the process from the front of the array
					console.log("\t\t\t\t\t  Ready Queue:", this.readyQueue)
					console.log("\t\t\t\t\t  Preempt Queue:", this.preemptQueue)

					// In the preempt Queue now because it was preempted increment its priority
					console.log("\t\t\t\t\t  Checking if", this.preemptQueue[0].pid, "isn't in Q3 yet:")
					if(parseInt(this.preemptQueue[0].priority, 10) != 3){ 
						console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")
						console.log("\t\t\t\t\t        ", this.preemptQueue[0].pid, "is not in Q3 yet");
						console.log("\t\t\t\t      Incrementing:", this.preemptQueue[0].pid + "'s priority from", this.preemptQueue[0].priority, "to:", this.preemptQueue[0].priority + 1);
						this.preemptQueue[0].priority += 1; // Increments the priority
						this.preemptQueue[0].timeQuantum = timeQuantum2;
						console.log("\t\t\t\t    Setting:", this.preemptQueue[0].pid + "'s new arrivalTime from:", this.preemptQueue[0].arrivalTime, "to:", this.currentTime);
						this.preemptQueue[0].arrivalTime = this.currentTime;	// Updates the processes arrival time
						console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")
					}

					// Goes back into the readyQueue with the new arrivalTime
					console.log("\t\t\t  " + this.preemptQueue[0].pid, "Arrives back into the ready queue with a new arrivalTime of:", this.preemptQueue[0].arrivalTime)
					console.log("\t\t\t\t\t   Ready Queue:", this.readyQueue)
					console.log("\t\t\t\t\t   Preempt Queue:", this.preemptQueue)
					console.log("\t\t\t\t     PreemptQueue gets cleared of the process")
					this.readyQueue.push(this.preemptQueue[0]);	
					this.preemptQueue.shift();	// The preempt queue gets cleared
					console.log("\t\t\t\t\t   Preempt Queue:",this.preemptQueue)

					console.log("\t\t\t\t           Process has finished running...");
					console.log("\t\t\t\t\t       The current time is:", this.currentTime)
					console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");








				}
			}
			
			if(this.readyQueue[0].priority === 2)
			{
				for(let i = 0; i <= this.readyQueue.length; i++) {
					if(this.readyQueue[0].priority === 2 || this.readyQueue[0].priority === 3){
						this.readyQueue.push(this.readyQueue[0]);
						this.readyQueue.shift();
					}
					else {
						break;
					}
				}
			}
		}
	}

	checkForQ2(){
		this.checkForQ1();
		// For the length of the ready Queue
		for(let i = this.readyQueue.length; i >= 0; i--) {
			this.checkIOQueue();
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			console.log("\t\t\t\t\t       The current time is:", this.currentTime);
			console.log("\t\tChecking for Q2 processes in the readyQueue:", this.readyQueue);
			console.log("Current Running Process:", this.readyQueue[0])
			console.log("------------------------------------------------------------------------------------------------------------------------------");
			if(this.readyQueue[0].priority === 2) {
				console.log("\t\t\t\t\t\t", this.readyQueue[0].pid, "Is a Q1 Process")
				console.log("\t\t\t\t Checking if:", this.readyQueue[0].timings[0], "is less then or equal to:", this.readyQueue[0].timeQuantum, ":", parseInt(this.readyQueue[0].timings[0], 10) <= this.readyQueue[0].timeQuantum)
				console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

				if(parseInt(this.readyQueue[0].timings[0], 10) <= this.readyQueue[0].timeQuantum) {
					console.log("\t\t\t Process:", this.readyQueue[0].pid + "'s", "burstTime:", this.readyQueue[0].timings[0], "is less then or Equal to the Q1 timeQuantum", this.readyQueue[0].timeQuantum);
					console.log("\t\t\t\tProcess is running for the length of the timeQuantum:", this.readyQueue[0].timeQuantum)
					console.log("\t\t\t\t\t\tProcess is running...")
					
					console.log("\t\t\t\t     Updating the currentTime from:", this.currentTime, "to:", this.currentTime + this.readyQueue[0].timings[0]);
					this.currentTime += this.readyQueue[0].timings[0];
					console.log("\t\t\t\t      Updating:", this.readyQueue[0].pid + "'s endTime from:", this.readyQueue[0].endTime, "to:", this.currentTime);
					this.readyQueue[0].endTime = this.currentTime;
					console.log("\t\t\t\t\t  Process has stopped running...");

					console.log("\t\t\tProcess:", this.readyQueue[0].pid, "has finished its burstTime and is removed from timings array");
					console.log("\t\t\t " + this.readyQueue[0].pid + "'s timing array:",this.readyQueue[0].timings);
					this.readyQueue[0].timings.shift();
					console.log("\t\t    " + this.readyQueue[0].pid + "'s timing array updated:",this.readyQueue[0].timings);

					console.log("\t\t\t  " + this.readyQueue[0].pid, "goes to I/O for:", this.readyQueue[0].timings[0], "time units and gets removed from the readyQueue");
					console.log("\t\t\t\t\t Updating:", this.readyQueue[0].pid + "'s arrivalTime from:", this.readyQueue[0].arrivalTime, "to:", parseInt(this.readyQueue[0].endTime, 10) + parseInt(this.readyQueue[0].timings[0], 10))
					this.readyQueue[0].arrivalTime = this.readyQueue[0].endTime + this.readyQueue[0].timings[0];
					this.readyQueue[0].timings.shift();

					console.log("\t\t\t\t\t   I/O Queue:", this.ioQueue);
					this.ioQueue.push(this.readyQueue[0]);
					console.log("\t\t\t\t     I/O Queue Updated:", this.ioQueue);

					console.log("\t\t\t\t\tReady Queue:", this.readyQueue);
					this.readyQueue.shift();
					console.log("\t\t\t\t      Ready Queue Updated:", this.readyQueue);
					continue;
				}

				console.log(this.readyQueue[0])
				console.log("\t\t\t\t    Checking if:", this.readyQueue[0].timings[0], "is greater then:", this.readyQueue[0].timeQuantum, ":", parseInt(this.readyQueue[0].timings[0], 10) > this.readyQueue[0].timeQuantum);
				console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
				if (parseInt(this.readyQueue[0].timings[0], 10) > this.readyQueue[0].timeQuantum)
				{ // If the process is less then or equal to the Q1 time Quantum
					console.log("\t\t\t\t",this.readyQueue[0].pid + "'s burstTime:", this.readyQueue[0].timings[0], "is greater then Q1 timeQuantum:", this.readyQueue[0].timeQuantum);
					console.log("\t\t\t\t\t       The current time is:", this.currentTime)

					console.log("\t\t\t\t\t        Process is Running...");
					console.log("\t\t\t\t\tUpdating", this.readyQueue[0].pid + "'s", "burstTime from:", this.readyQueue[0].timings[0], "to:", parseInt(this.readyQueue[0].timings[0], 10) - this.readyQueue[0].timeQuantum);
					this.readyQueue[0].timings[0] = parseInt(this.readyQueue[0].timings[0], 10) - this.readyQueue[0].timeQuantum;
					console.log("\t\t\t\t\t Updating", this.readyQueue[0].pid + "'s", "endTime from:", this.readyQueue[0].endTime, "to:", this.currentTime + this.readyQueue[0].timeQuantum);
					this.readyQueue[0].endTime = this.currentTime + this.readyQueue[0].timeQuantum;
					this.currentTime = this.readyQueue[0].endTime;

					console.log("\t\t\t\t\t  Ready Queue:", this.readyQueue)
					console.log("\t\t\t\t\t  Preempt Queue:", this.preemptQueue)
					console.log("\t\t\tPreempting:", this.readyQueue[0].pid, "from the readyQueue and pushing it to the preemptQueue")
					this.preemptQueue.push(this.readyQueue[0]);	// Because the process couldn't complete before the time quantum it gets preempted
					this.readyQueue.shift();	// Removing the process from the front of the array
					console.log("\t\t\t\t\t  Ready Queue:", this.readyQueue)
					console.log("\t\t\t\t\t  Preempt Queue:", this.preemptQueue)

					// In the preempt Queue now because it was preempted increment its priority
					console.log("\t\t\t\t\t  Checking if", this.preemptQueue[0].pid, "isn't in Q3 yet:")
					if(parseInt(this.preemptQueue[0].priority, 10) != 3){ 
						console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")
						console.log("\t\t\t\t\t        ", this.preemptQueue[0].pid, "is not in Q3 yet");
						console.log("\t\t\t\t      Incrementing:", this.preemptQueue[0].pid + "'s priority from", this.preemptQueue[0].priority, "to:", this.preemptQueue[0].priority + 1);
						this.preemptQueue[0].priority += 1; // Increments the priority
						this.preemptQueue[0].timeQuantum = 0;
						console.log("\t\t\t\t    Setting:", this.preemptQueue[0].pid + "'s new arrivalTime from:", this.preemptQueue[0].arrivalTime, "to:", this.currentTime);
						this.preemptQueue[0].arrivalTime = this.currentTime;	// Updates the processes arrival time
						console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")
					}

					// Goes back into the readyQueue with the new arrivalTime
					console.log("\t\t\t  " + this.preemptQueue[0].pid, "Arrives back into the ready queue with a new arrivalTime of:", this.preemptQueue[0].arrivalTime)
					console.log("\t\t\t\t\t   Ready Queue:", this.readyQueue)
					console.log("\t\t\t\t\t   Preempt Queue:", this.preemptQueue)
					console.log("\t\t\t\t     PreemptQueue gets cleared of the process")
					this.readyQueue.push(this.preemptQueue[0]);	
					this.preemptQueue.shift();	// The preempt queue gets cleared
					console.log("\t\t\t\t\t   Preempt Queue:",this.preemptQueue)

					console.log("\t\t\t\t           Process has finished running...");
					console.log("\t\t\t\t\t       The current time is:", this.currentTime)
					console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
				}
			}
			
			if(this.readyQueue[0].priority === 3)
			{
				for(let i = 0; i <= this.readyQueue.length; i++) {
					if(this.readyQueue[0].priority === 3){
						this.readyQueue.push(this.readyQueue[0]);
						this.readyQueue.shift();
					}
					else {
						break;
					}
				}
			}
		}
	}

	checkForQ3(){
		// For the length of the ready Queue
		this.readyQueue.forEach((process) => {
			if(process.priority === 3) {
				this.completed.push(process);
				this.readyQueue.shift();
			}
		});
	}

	checkIOQueue(){
		// For the length of the I/O Queue
		for(let i = this.ioQueue.length - 1; i >= 0; i--) {
            console.log("\t\t\t\t\t Checking if:", this.ioQueue[0].pid, "Has finished in IO");
			console.log("\t\t\t\t\t      The current time is:", this.currentTime)
			console.log("\t\t\t\t\t   Process: ", this.ioQueue[0].pid + "'s arrivalTime:", this.ioQueue[0].arrivalTime);

			// If the processes burst plus its endTime (arrivalTime) equals the current time
			if(this.currentTime >= parseInt(this.ioQueue[0].arrivalTime, 10)) {
				console.log("\t\t\t\t\t" + this.ioQueue[0].pid, "Has finished in IO")
				console.log("\t\t\t\t  Ready Queue:", this.readyQueue)
				this.readyQueue.push(this.ioQueue[0]);	// Push the process back to the readyQueue
				this.ioQueue.shift();
				console.log("\t\t\t\t  Ready Queue Updated:",this.readyQueue)
			}
			else if(this.ioQueue[0].arrivalTime > this.currentTime)
			{
				console.log("\t\t\t\t\t  " + this.ioQueue[0].pid, "Has not finished in IO yet")
				this.ioQueue.push(this.ioQueue[0]);
				this.ioQueue.shift();
			}
			console.log("*****************************************************************************************************************************");
		}
	}
}

// Main
const MLFQ = new Scheduler();

document.querySelector('#app').innerHTML = 
`
  <header><h1>CPU Scheduling Algorithms</h1></header>
  <hr  />
  
`