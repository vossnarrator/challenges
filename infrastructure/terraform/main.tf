provider "aws" {
  region = "${var.aws_region}"
}

module "vpc" {
  source  = "modules/vpc"
}
