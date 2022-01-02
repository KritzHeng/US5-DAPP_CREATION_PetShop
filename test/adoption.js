// const Adoption = artifacts.require("Adoption");

var Adoption = artifacts.require("Adoption");

contract('Adoptionm', function(accounts){
  describe('First group of test', () =>{
    let instance;

    before(async ()=>{
      instance = await Adoption.deployed();
    });

    it('User should adoupt a pet', async ()=>{
      await instance.adopt.sendTransaction(8, {from: accounts[0]});
      let adopter = await instance.adopters.call(8);
      assert.equal(adopter, accounts[0], "Incorrect owner address");
    });

    it('should get adopter address by pet if in array', async ()=>{
      let adopters = await instance.getAdopters.call();
      assert.equal(adopters[8], accounts[0], "Owner of per id should be recorder in the array");
    });


    it('should throw if invalid pet id is given', async()=>{
      try{
        await instance.adopt.sendTransaction(8, {from: accounts[0]});
        asser.fail(true,false,"This function did not throw");
      }catch(error){
        assert.include(String(error), "revert", 'Expected "revert" bet instead got ${}',);
      }
    });









  });
});

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
// contract("Adoption", function (/* accounts */) {
//   it("should assert true", async function () {
//     await Adoption.deployed();
//     return assert.isTrue(true);
//   });
// });
