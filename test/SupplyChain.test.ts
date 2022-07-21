import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import argon2 from 'argon2';

import Part from '@modules/supply-chain/model/entities/Part';
import { BigNumber } from 'ethers';
import { SupplyChain } from '../typechain-types';
import PartService from '@modules/supply-chain/model/services/PartService';
import PostProcessingService from '@modules/supply-chain/model/services/PostProcessingService';
import PostProcessing from '@modules/supply-chain/model/entities/PostProcessing';
import QualityCheck from '@modules/supply-chain/model/entities/QualityCheck';
import QualityCheckService from '@modules/supply-chain/model/services/QualityCheckService';

describe('SupplyChain', function () {
  async function deploy() {
    const [owner, manufacturer, designer] = await ethers.getSigners();

    const SupplyChain = await ethers.getContractFactory('SupplyChain');
    const supplyChain = await SupplyChain.deploy();

    const chainData = { supplyChain, owner, manufacturer, designer };

    return chainData;
  }

  async function hashEmptyObject() {
    return await argon2.hash(JSON.stringify({}));
  }

  async function createPart(
    supplyChain: SupplyChain,
    owner: string,
    manufacturer: string,
    designer: string,
    id: number,
  ) {
    const partService = new PartService(supplyChain);

    const part: Part = {
      ownership: owner,
      first: owner,
      manufacturedBy: manufacturer,
      designedBy: designer,
      manufacturingDate: BigNumber.from(new Date().getTime()).toString(),
      process: 'DESIGN',
      processParameters: await hashEmptyObject(),
    };

    await partService.create(part);

    const retrievedPart = await partService.get(id);

    return { part, retrievedPart };
  }

  describe('Part', async function () {
    it('Should add a part to the blockchain', async function () {
      const { supplyChain, owner, manufacturer, designer } = await loadFixture(
        deploy,
      );

      const { retrievedPart, part } = await createPart(
        supplyChain,
        await owner.getAddress(),
        await manufacturer.getAddress(),
        await designer.getAddress(),
        0,
      );

      expect(retrievedPart).to.contains(part);
      expect(retrievedPart.id).to.equals(0);
    });

    it('Should retrieve a part from the blockchain', async function () {
      const { supplyChain, owner, manufacturer, designer } = await loadFixture(
        deploy,
      );

      const partService = new PartService(supplyChain);

      await createPart(
        supplyChain,
        await owner.getAddress(),
        await manufacturer.getAddress(),
        await designer.getAddress(),
        0,
      );

      const retrievedPartArray = await partService.get(0);

      expect(retrievedPartArray['id']).to.equals(0);
      expect(retrievedPartArray['ownership']).to.equals(
        await owner.getAddress(),
      );
    });

    it('Should allow ownership changes', async function () {
      const { supplyChain, owner, manufacturer, designer } = await loadFixture(
        deploy,
      );

      const { retrievedPart: part } = await createPart(
        supplyChain,
        await owner.getAddress(),
        await manufacturer.getAddress(),
        await designer.getAddress(),
        0,
      );

      expect(part.ownership).to.equals(await owner.getAddress());

      if (part.id !== 0) throw new Error('Part id not found');

      const partService = new PartService(supplyChain);

      await partService.modifyOwnership(
        part.id,
        await manufacturer.getAddress(),
      );

      const retrievedPart: Part = await partService.get(part.id);

      expect(retrievedPart.ownership).to.equals(
        await manufacturer.getAddress(),
      );
    });

    it('Should not allow change ownership if is not the owner of the part', async function () {
      const { supplyChain, owner, designer, manufacturer } = await loadFixture(
        deploy,
      );

      const { retrievedPart: part } = await createPart(
        supplyChain,
        await manufacturer.getAddress(),
        await manufacturer.getAddress(),
        await designer.getAddress(),
        0,
      );

      if (part.id !== 0) throw new Error('Part id not found');

      const partService = new PartService(supplyChain);

      expect(
        partService.modifyOwnership(part.id, await manufacturer.getAddress()),
      ).to.be.revertedWith("You aren't the owner");
    });
  });

  describe('Post Processing', async function () {
    it('Should add post processing information of a part to the blockchain', async function () {
      const { supplyChain, owner, manufacturer, designer } = await loadFixture(
        deploy,
      );

      const { retrievedPart: part } = await createPart(
        supplyChain,
        await owner.getAddress(),
        await manufacturer.getAddress(),
        await designer.getAddress(),
        0,
      );

      if (part.id !== 0) throw new Error('Part id not found');

      expect(part.id).to.equals(0);

      const postProcessing: PostProcessing = {
        company: await manufacturer.getAddress(),
        process: 'POST_PROCESS_1',
        processParameters: await hashEmptyObject(),
        date: BigNumber.from(new Date().getTime()).toString(),
      };

      const postProcessingService = new PostProcessingService(supplyChain);

      await postProcessingService.create(0, postProcessing);

      const retrievedPostProcessing = await postProcessingService.get(0);

      expect(retrievedPostProcessing[0]).to.contains(postProcessing);
    });

    it('Should retrieve post processing information from the blockchain', async function () {
      const { supplyChain, owner, manufacturer, designer } = await loadFixture(
        deploy,
      );

      await createPart(
        supplyChain,
        await owner.getAddress(),
        await manufacturer.getAddress(),
        await designer.getAddress(),
        0,
      );

      const postProcessing: PostProcessing = {
        company: await manufacturer.getAddress(),
        process: 'POST_PROCESS_1',
        processParameters: await hashEmptyObject(),
        date: BigNumber.from(new Date().getTime()).toString(),
      };

      const postProcessingService = new PostProcessingService(supplyChain);

      await postProcessingService.create(0, postProcessing);

      const retrievedPostProcessing = await postProcessingService.get(0);

      expect(retrievedPostProcessing[0]).to.contains(postProcessing);
    });
  });

  describe('Quality Check', async function () {
    it('Should add quality check information of a part to the blockchain', async function () {
      const { supplyChain, owner, manufacturer, designer } = await loadFixture(
        deploy,
      );

      const { retrievedPart: part } = await createPart(
        supplyChain,
        await owner.getAddress(),
        await manufacturer.getAddress(),
        await designer.getAddress(),
        0,
      );

      if (part.id !== 0) throw new Error('Part id not found');

      expect(part.id).to.equals(0);

      const qualityCheck: QualityCheck = {
        company: await manufacturer.getAddress(),
        process: 'QUALITY_CHECK_1',
        processParameters: await hashEmptyObject(),
        date: BigNumber.from(new Date().getTime()).toString(),
      };

      const qualityCheckService = new QualityCheckService(supplyChain);

      await qualityCheckService.create(0, qualityCheck);

      const retrievedQualityCheck = await qualityCheckService.get(0);

      expect(retrievedQualityCheck[0]).to.contains(qualityCheck);
    });

    it('Should retrieve quality check information from the blockchain', async function () {
      const { supplyChain, owner, manufacturer, designer } = await loadFixture(
        deploy,
      );

      await createPart(
        supplyChain,
        await owner.getAddress(),
        await manufacturer.getAddress(),
        await designer.getAddress(),
        0,
      );

      const qualityCheck: QualityCheck = {
        company: await manufacturer.getAddress(),
        process: 'QUALITY_CHECK_1',
        processParameters: await hashEmptyObject(),
        date: BigNumber.from(new Date().getTime()).toString(),
      };

      const qualityCheckService = new QualityCheckService(supplyChain);

      await qualityCheckService.create(0, qualityCheck);

      const retrievedQualityCheck = await qualityCheckService.get(0);

      expect(retrievedQualityCheck[0]).to.contains(qualityCheck);
    });
  });
});
