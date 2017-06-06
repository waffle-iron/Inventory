'use strict'

require('dotenv').config()

const User = require('./user')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const logger = require('winston')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(chaiAsPromised)
chai.use(sinonChai)

const expect = chai.expect

const db = require('../db')

describe('User module', () => {
  describe('"up"', () => {
    it('should export a function', () => {
      expect(User.up).to.be.a('function')
    })

    it('should return a Promise', () => {
      const usersUpResult = User.up()
      expect(usersUpResult.then).to.be.a('Function')
      expect(usersUpResult.catch).to.be.a('Function')
    })

    it('should create a table named "users"', async () => {
      await User.up()

      return expect(db.schema.hasTable('users'))
        .to.eventually.be.true
    })
  })

  describe('"fetch"', () => {
    const testName = 'Peter'

    it('should export a function', () => {
      expect(User.fetch).to.be.a('Function')
    })

    it('should return a Promise', () => {
      const usersFetchResult = User.fetch(testName)
      expect(usersFetchResult.then).to.be.a('Function')
      expect(usersFetchResult.catch).to.be.a('Function')
    })

    describe('with inserted rows', () => {
      before(() => User.up())

      beforeEach(() =>
        Promise.all([
          db.insert({ name: testName }).into('users'),
          db.insert({ name: 'John' }).into('users')
        ])
      )

      it('should return the users by their name', async () => {
        const userdb = await User.fetch(testName)

        expect(userdb[0].name).to.be.eql('Peter')
      })

      it('should return users with timestamps and id', async () => {
        const userdb = await User.fetch(testName)

        expect(userdb[0]).to.have.keys('created_at', 'updated_at', 'id', 'name')
      })

      it('should call winston if name is all lowercase', async () => {
        sinon.stub(logger, 'info')
        await User.fetch(testName.toLocaleLowerCase())

        expect(logger.info).to.have.been.calledWith('lowercase parameter supplied')
        logger.info.restore()
      })

      it('should build the query properly', async () => {
        const sandbox = sinon.sandbox.create()

        const fakeDb = {
          from: sinon.spy(function () {
            return this
          }),
          where: sinon.spy(function () {
            return Promise.resolve()
          })
        }

        sandbox.stub(db, 'select').callsFake(() => fakeDb)
        sandbox.stub(logger, 'info')

        await User.fetch(testName.toLocaleLowerCase())

        expect(db.select).to.have.been.calledOnce
        expect(fakeDb.from).to.have.been.calledOnce
        expect(fakeDb.where).to.have.been.calledOnce

        sandbox.restore()
      })

      it('should log and rethrow database error', async () => {
        const sandbox = sinon.sandbox.create()

        sandbox.stub(logger, 'info')
        sandbox.stub(logger, 'error')
        const mock = sinon.mock(db)
        mock.expects('select').once().returnsThis()
        mock.expects('from').once().returnsThis()
        mock.expects('where').once().returns(Promise.reject(new Error('database has failed')))

        expect(User.fetch(testName.toLocaleLowerCase()))
          .to.be.rejectedWith('database has failed')

        sandbox.restore()
      })
    })
  })
})
