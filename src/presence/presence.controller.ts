import { Controller, Get, Req, Session, UseGuards, Param, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';


@Controller('presence')
export class PresenceController {

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() request): string {            
    return request.user;
  }

  @Get("/:branchId")
  @UseGuards(JwtAuthGuard)
  findByBranch(@Req() request, @Param('branchId') branchId : Number): any {            
    
    return branchId;
  }

  @Post("/:locationId/:personId")
  @UseGuards(JwtAuthGuard)
  togglePresenceStatus(
    @Req() request, 
    @Param('locationId') locationId : Number,
    @Param('personId') personId : Number): any {            
    
    return { locationId, personId };
  }
}
