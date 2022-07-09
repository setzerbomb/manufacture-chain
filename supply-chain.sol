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
        uint256 date;
    }

    struct QualityCheck {
        address company;
        string process;
        uint256 process_parameters;
        uint256 date;
    }

    struct Part {
        uint256 id;
        address ownership;
        address manufacturedBy;
        address designedBy;
        string description;
        PostProcessing[] post_processing;
        uint256 manufacturing_date;
    }

    Part[] public parts;

    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function modifyOwnership(Part memory _part, address memory newOwner)
        public
    {
        require(msg.sender == _part.ownership);
        _part.ownership = newOwner;
    }

    function createPart(
        uint256 memory _id,
        address memory _ownership,
        address memory _manufacturedBy,
        address memory _designedBy,
        PostProcessing[] memory _post_processing,
        uint256 memory _manufacturing_date
    ) onlyOwner {
        Part memory newpart = Part(
            _id,
            _ownership,
            _manufacturedBy,
            _designedBy,
            _post_processing,
            _manufacturing_date
        );
        parts.push(newpart);
    }

    function addPostProcessing(
        Part memory _part,
        address memory _company,
        string memory _process,
        uint256 memory _process_parameters,
        uint256 memory _date
    ) public onlyOwner {
        require(msg.sender == _part.ownership);

        this.modifyOwnership(_part, _company);
        PostProcessing memory new_post_processing = PostProcessing(
            _company,
            _process,
            _process_parameters,
            _date
        );
        _part.postProcessing.push(new_post_processing);
    }

    function addQualityCheck(
        Part memory _part,
        address memory _company,
        string memory _process,
        uint256 memory _process_parameters,
        uint256 memory _date
    ) public onlyOwner {
        require(msg.sender == _part.ownership);

        this.modifyOwnership(_part, _company);
        PostProcessing memory new_post_processing = QualityCheck(
            _company,
            _process,
            _process_parameters,
            _date
        );
        _part.postProcessing.push(new_post_processing);
    }
}
