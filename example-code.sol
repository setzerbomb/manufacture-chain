pragma solidity ^0.5.0;
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
/**
* @title Supply Chain
* @author Alberto Cuesta Canada
* @notice Implements a basic compositional supply chain contract.
*/
contract SupplyChain {
   using SafeMath for uint256;   event StepCreated(uint256 step);   
   /**
    * @notice Supply chain step data. By chaining these and not 
    * allowing them to be modified afterwards we create an Acyclic
    * Directed Graph.
    * @dev The step id is not stored in the Step itself because it
    * is always previously available to whoever looks for the step.
    * @param creator The creator of this step.
    * @param item The id of the object that this step refers to.
    * @param precedents The step ids preceding this one in the
    * supply chain.
    */
   struct Step {
       address creator;
       uint256 item;
       uint256[] precedents;
   }   /**
    * @notice All steps are accessible through a mapping keyed by
    * the step ids. Recursive structs are not supported in solidity.
    */
   mapping(uint256 => Step) public steps;   /**
    * @notice Step counter
    */
   uint256 public totalSteps;   /**
    * @notice Mapping from item id to the last step in the lifecycle 
    * of that item.
    */
   mapping(uint256 => uint256) public lastSteps;

   /**
    * @notice A method to create a new supply chain step. The 
    * msg.sender is recorded as the creator of the step, which might
    * possibly mean creator of the underlying asset as well.
    * @param _item The item id that this step is for. This must be
    * either the item of one of the steps in _precedents, or an id
    * that has never been used before.
    * @param _precedents An array of the step ids for steps
    * considered to be predecessors to this one. Often this would 
    * just mean that the event refers to the same asset as the event 
    * pointed to, but for other steps it could point to other
    * different assets.
    * @return The step id of the step created.
    */
   function newStep(uint256 _item, uint256[] memory _precedents)
       public
       returns(uint256)
   {
       for (uint i = 0; i < _precedents.length; i++){
           require(
               isLastStep(_precedents[i]), 
               "Append only on last steps."
           );
       }
       bool repeatInstance = false;
       for (uint i = 0; i < _precedents.length; i++){
           if (steps[_precedents[i]].item == _item) {
               repeatInstance = true;
               break;
           }
       }
       if (!repeatInstance){
           require(lastSteps[_item] == 0, "Instance not valid.");
       }
      
       steps[totalSteps] = Step(
           msg.sender,
           _item,
           _precedents
       );
       uint256 step = totalSteps;
       totalSteps += 1;
       lastSteps[_item] = step;
       emit StepCreated(step);
       return step;
   }   /**
    * @notice A method to verify whether a step is the last of an 
    * item.
    * @param _step The step id of the step to verify.
    * @return Whether a step is the last of an item.
    */
   function isLastStep(uint256 _step)
       public
       view
       returns(bool)
   {
       return lastSteps[steps[_step].item] == _step;
   }   /**
    * @notice A method to retrieve the precedents of a step.
    * @param _step The step id of the step to retrieve precedents
    * for.
    * @return An array with the step ids of the precedent steps.
    */
   function getprecedents(uint256 _step)
       public
       view
       returns(uint256[] memory)
   {
       return steps[_step].precedents;
   }
}