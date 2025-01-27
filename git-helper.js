#!/usr/bin/env node
//This line tells the operating system that the file is a Node.js script and should be executed with Node.js when you run it.

const { Command } = require('commander');
const git = require('simple-git')(); //simple-git: A package that allows us to use Git commands from inside a JavaScript program (Node.js).
const program = new Command();

// Tool description
program
  .name('Git Helper Tool')
  .description('A CLI tool to automate common Git tasks')
  .version('1.0.0');

// Command: Git Status
program
  .command('status')
  .description('Show the current status of the repository')
  .action(async () => {
    try {
      const status = await git.status();
      console.log('Git Status:\n', status);
    } catch (error) {
      console.error('Error fetching Git status:', error.message);
    }
  });

// Command: Push Changes
program
  .command('push')
  .description('Push changes to a remote branch')
  .option('-b, --branch <branch>', 'Specify the branch to push')
  .action(async (options) => {
    const branch = options.branch;
    if (!branch) {
      console.error('Error: You must specify a branch using -b or --branch');
      return;
    }
    try {
      await git.push('origin', branch);
      console.log(`Successfully pushed changes to branch ${branch}`);
    } catch (error) {
      console.error('Error pushing changes:', error.message);
    }
  });

// Command: Pull Changes
program
  .command('pull')
  .description('Pull changes from a remote branch')
  .option('-b, --branch <branch>', 'Specify the branch to pull from')
  .action(async (options) => {
    const branch = options.branch;
    if (!branch) {
      console.error('Error: You must specify a branch using -b or --branch');
      return;
    }
    try {
      await git.pull('origin', branch);
      console.log(`Successfully pulled changes from branch ${branch}`);
    } catch (error) {
      console.error('Error pulling changes:', error.message);
    }
  });

// Command: Create a New Branch
program
  .command('create-branch')
  .description('Create and switch to a new branch')
  .argument('<branchName>', 'Name of the branch to create')
  .action(async (branchName) => {
    try {
      await git.checkoutLocalBranch(branchName);
      console.log(`Successfully created and switched to branch ${branchName}`);
    } catch (error) {
      console.error('Error creating branch:', error.message);
    }
  });

// Command: Checkout an Existing Branch
program
  .command('checkout')
  .description('Switch to an existing branch')
  .argument('<branchName>', 'Name of the branch to switch to')
  .action(async (branchName) => {
    try {
      await git.checkout(branchName);
      console.log(`Successfully switched to branch ${branchName}`);
    } catch (error) {
      console.error('Error checking out branch:', error.message);
    }
  });

// Parse the CLI arguments
program.parse();
