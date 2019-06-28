class WorkObject {
  constructor() {
    this.extraNonce1= '';
    this.extraNonce2Size= 0;
    this.miningDiff= 0;
    // ID of the job. Use this ID while submitting share generated from this job.
    this.jobId= 0;
    this.prevhash= ''; // - Hash of previous block.
    this.coinb1= ''; // - Initial part of coinbase transaction.
    this.coinb2= ''; // - Final part of coinbase transaction.
    // List of hashes, will be used for calculation of merkle root.
    // This is not a list of all transactions, it only contains prepared hashes of
    // steps of merkle tree algorithm. Please read some materials for understanding
    // how merkle trees calculation works. Unfortunately this example don't have any
    // step hashes included, my bad!
    this.merkle_branch= '';
    this.version= ''; // - Bitcoin block version.
    this.nbits= ''; // - Encoded current network difficulty
    this.ntime= ''; // - Current ntime/
    // When true, server indicates that submitting shares from previous jobs don't
    // have a sense and such shares will be rejected. When this flag is set, miner
    // should also drop all previous jobs, so job_ids can be eventually rotated.
    this.clean_jobs= '';
  }
};

module.exports = WorkObject;
