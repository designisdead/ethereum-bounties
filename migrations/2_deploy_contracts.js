const ContractRegistry = artifacts.require('ContractRegistry')
const Controller = artifacts.require('Controller');
const PeopleProxy = artifacts.require('PeopleProxy')
const PeopleLib = artifacts.require('PeopleLib')
const People = artifacts.require('People')
const GroupProxy = artifacts.require('GroupProxy')
const GroupLib = artifacts.require('GroupLib')
const BountyLib = artifacts.require('BountyLib')
const BountyProxy = artifacts.require('BountyProxy')
const Group = artifacts.require('Group')
const TimesheetProxy = artifacts.require('TimesheetProxy')
const TimesheetLib = artifacts.require('TimesheetLib')
const Timesheet = artifacts.require('Timesheet')
const Token = artifacts.require('Token')

module.exports = deployer => {
  deployer.then(async () => {
    const contractRegistry = await deployer.deploy(ContractRegistry)
    const token = await deployer.deploy(Token, "Knuckles", "KNCKL", 18)
      await contractRegistry.addContract('token', token.address)
    const peopleLib = await deployer.deploy(PeopleLib)
      await contractRegistry.addLibrary('people', peopleLib.address)
    const peopleProxy = await deployer.deploy(PeopleProxy)
      await contractRegistry.addContract('people-proxy', peopleProxy.address)
    const groupLib = await deployer.deploy(GroupLib)
      await contractRegistry.addLibrary('group', groupLib.address)
    const groupProxy = await deployer.deploy(GroupProxy)
      await contractRegistry.addContract('group-proxy', groupProxy.address)
    const bountyLib = await deployer.deploy(BountyLib)
      await contractRegistry.addLibrary('bounty', bountyLib.address)
    const bountyProxy = await deployer.deploy(BountyProxy)
      await contractRegistry.addContract('bounty-proxy', bountyProxy.address)
    const timesheetLib = await deployer.deploy(TimesheetLib)
      await contractRegistry.addLibrary('timesheet', timesheetLib.address)
    const timesheetProxy = await deployer.deploy(TimesheetProxy)
      await contractRegistry.addContract('timesheet-proxy', timesheetProxy.address)
    People.link('PeopleInterface', peopleProxy.address)
    Controller.link({GroupInterface: groupProxy.address, BountyInterface: bountyProxy.address})
    Group.link({GroupInterface: groupProxy.address, BountyInterface: bountyProxy.address})
    Timesheet.link('TimesheetInterface', timesheetProxy.address)
    const controller = await deployer.deploy(Controller)
      await contractRegistry.addContract('controller', controller.address)
      await token.transferOwnership(controller.address)
    const people = await deployer.deploy(People)
      await contractRegistry.addContract('people-storage', people.address)
    const timesheet = await deployer.deploy(Timesheet)
      await contractRegistry.addContract('timesheet-storage', timesheet.address)
    console.info('============= CONTRACTS SUCCESFULLY DEPLOYED ===============')
  })
}