import React from 'react';

class About extends React.Component {
	render () {
		return (
	      <main class="generic">
				<h2>About</h2>
				<p><em>Finish It!</em> is a combined task manager and social network designed to motivate users to complete tasks and achieve goals. I built it as a final project for the JavaScript course at Developers Institute. Feel free to register and try it out!</p>
				<p><em>Please note! Any tasks set to private will not be shared, but do not enter any truly sensitive data, as this site is currently only a demo and is not secure.</em></p>
				<p><em>Finish It!</em> helps you get tasks done in two ways:</p>
				<ol>
					<li>Tasks can be shared with other users, creating opportunities for discussion and support, but also pressure to follow through. When a shared task isn't completed on time, a post goes out saying so.</li>
					<li>Users also have the option to set up a penalty on ifttt.com, to be triggered if a task is't completed on time. This can be anything from posting an embarrassing photo to Twitter, to donating to a cause the user disagrees with.</li>
				</ol>
				<h4>Features</h4>
				<ul>
					<li>Registration and login system.</li>
					<li>Task list where user can enter, edit, and delete tasks, and change status to completed or back to uncompleted.</li>
					<li>News feed showing all users' shared tasks. Each is displayed and sorted according to its most relevant status (just shared, completed, or uncompleted and past due).</li>
					<li>Shared tasks can be liked and commented on.</li>
					<li>Clicking on any user's name brings up their profile, along with their shared tasks. Each user can edit their own profile and provide an avatar link. A random avatar is shown by default.</li>
				</ul>
				<h4>IFTTT integration</h4>
				<p>You can add an IFTTT penalty to a task by following these steps:</p>
				<ol>
					<li>Register at <a href="https://ifttt.com">ifttt.com</a>. (You can create up to three applets for free).</li>
					<li>Click on <em>Add</em> next to <em>If This</em>.</li>
					<li>Click on <em>Create</em> at the top of the screen.</li>
					<li>Search for and select <em>Webhooks</em>, and then click on <em>Receive a web request</em>.</li>
					<li>Enter an event name (it can be anything) and click on <em>Create trigger</em>. Enter the same event name into your task's <em>IFTTT name</em> field.</li>
					<li>Click on <em>Add</em> next to <em>Then That</em>, select a service, set up whatever event you would like to be carried out, and click <em>Create action</em>.</li>
					<li>Click <em>Continue</em> and then <em>Finish</em>.</li>
					<li>Go to the <a href="https://ifttt.com/maker_webhooks/">Webhooks page</a> and click on <em>Documentation.</em> Copy the key shown and paste it into your task's <em>IFTTT key</em> field.</li>
					<li>Save your task, and that's it! If the task is not completed by the exact due date and time you set, the IFTTT event will automatically be triggered.</li>
				</ol>
				<h4>Technical details</h4>
				<p>The back end uses Node.js and MongoDB. JWTs keep user logged in for 30 days or until they log out. Passwords are encrypted with bcrypt.</p>
				<p>The front end uses React and Redux. Additional packages include react-collapsible, react-textarea-autosize, date-fns.</p>
				<p>Penalties are scheduled with cron. When a task is completed they are immediately stopped with cron-manager.</p>
      </main>
		)
	}
}

export default About;