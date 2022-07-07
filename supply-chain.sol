pragma solidity ^0.5.0;
/*
Temporary definitions for problem domain structs and contracts
*/
contract MAMSupplyChain {

    struct PostProcessing {
        address company;
        string process;
        uint256 process_parameters;
        /* date can be defined by unix epoch time*/
        uint256 date
    }

    struct QualityAssurance {
        address company;
        string process;
        uint256 process_parameters;
        uint256 date
    }
    
    struct Part {
        uint256 id;
        address ownership;
        address manufacturedBy; 
        address designedBy;
        postProcessing[] post_processing;
        uint256 manufacturing_date

    }

    struct Company {
        string cnpj;
        string name;
        string street;
        int street_number;
        string address_details;
        string city;
        string state;
    }

    function modifyOwnership(Part _part, address newOwner) public view {
        _part.ownership = newOwner;
    }

    function createPart(uint256 _id, address _ownership,address _manufacturedBy, address _designedBy,
                            PostProcessing[] _post_processing, uint256 _manufacturing_date) returns Part 
        {
            Part newpart = Part( _id, _ownership, _manufacturedBy, _designedBy, _post_processing, _manufacturing_date);
            return newpart;

    }

    function addPostProcessing(Part _part, address _company, string _process, uint256 _process_parameters, uint256 _date) {
        PostProcessing new_post_processing = PostProcessing(_company, _process, _process_parameters, _date);
        _part.postProcessing.push(new_post_processing);

    }

}